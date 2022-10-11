import os
import shutil
import pymysql
import datetime
from flask import Flask, render_template, request, Response, jsonify
from flask_restx import Resource, Api, reqparse, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta
import json
from flask_cors import CORS
from itertools import groupby

app = Flask(__name__)
CORS(app, resources=r'/*')  # 解决跨域问题


class Config(object):
    # app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:hyt135565@localhost:3306/test_database"
    app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://admin:z12345678@bug-team.cxba7lq9tfkj.ap-southeast-2.rds.amazonaws.com:3306/wait_management" #连接数据库方式，连云数据库的方式
    app.config['SQLALCHEMY_TRACK_MODIFICATION'] = True
    # app.config['SQLALCHEMY_ECHO'] = True
    app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = False

app.config.from_object(Config)
db = SQLAlchemy(app)


class Base(db.Model):  # 基础格式
    __abstract__ = True

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()


class Key(Base):  # The structure of table
    __tablename__ = "key"

    id = db.Column(db.INT, primary_key=True, autoincrement=True)
    role = db.Column(db.String(255))
    password = db.Column(db.String(255))


class Services(Base):  # The structure of category table
    __tablename__ = "service"

    id = db.Column(db.INT, primary_key=True, autoincrement=True)
    table = db.Column(db.Integer, nullable=False)
    startTime = db.Column(db.DateTime, nullable=False)
    endTime = db.Column(db.DateTime)
    status = db.Column(db.INT, nullable=False, default=0)


class Category(Base):  # The structure of category table
    __tablename__ = "category"

    id = db.Column(db.INT, primary_key=True, autoincrement=True)
    categoryId = db.Column(db.INT, nullable=False)
    categoryName = db.Column(db.String(255), nullable=False)
    lastModified = db.Column(db.DateTime, nullable=False)


class Menuitem(Base):
    __tablename__ = "menuItems"

    id = db.Column(db.INT, primary_key=True, autoincrement=True)
    dishId = db.Column(db.INT, nullable=False)
    categoryId = db.Column(db.Integer)
    categoryName = db.Column(db.String(255))
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255))
    ingredient = db.Column(db.String(255))
    cost = db.Column(db.Float, default=0)
    picture = db.Column(db.String(255))
    calorie = db.Column(db.Float, default=0)
    orderTimes = db.Column(db.Integer)
    lastModified = db.Column(db.DateTime, nullable=False)


class Orders(Base):
    __tablename__ = "orders"

    orderId = db.Column(db.INT, primary_key=True, autoincrement=True)
    orderTime = db.Column(db.DateTime)
    table = db.Column(db.INT, nullable=False)
    diner = db.Column(db.INT, nullable=False)
    status = db.Column(db.String(45), nullable=False, default="Wait")
    isPay = db.Column(db.Integer, nullable=False, default=0)
    payTime = db.Column(db.DateTime)
    orderitems = db.relationship("Orderitem", backref='orders')


class Orderitem(Base):
    __tablename__ = "orderItems"

    itemIndex = db.Column(db.INT, primary_key=True, autoincrement=True)
    dishId = db.Column(db.INT, nullable=False)
    orderId = db.Column(db.INT, db.ForeignKey("orders.orderId"))
    itemTime = db.Column(db.DateTime)
    status = status = db.Column(db.String(45), nullable=False, default="Wait")


# 数据库查询query转为字典格式
def model_to_dict(result):
    from collections.abc import Iterable
    try:
        if isinstance(result, Iterable):
            tmp = [dict(zip(res.__dict__.keys(), res.__dict__.values())) for res in result]
            for t in tmp:
                t.pop('_sa_instance_state')
        else:
            tmp = dict(zip(result.__dict__.keys(), result.__dict__.values()))
            tmp.pop('_sa_instance_state')
        print("model_to_dict: ", tmp)
        return tmp
    except BaseException as e:
        print(e.args)
        raise TypeError('Type error of parameter')


@app.route('/staff', methods=["POST"])  # login interface
def login():
    return_json = {}
    transfer_data = json.loads(json.dumps(request.get_json()))  # json格式传过来的信息
    if (transfer_data["staff"] is not None) and (transfer_data["key"] is not None):
        role_information = db.session.query(Key).all()  # 获取所有role和key的信息
        role_information = model_to_dict(role_information)
        role = transfer_data["staff"]
        pwd = transfer_data["key"]
        flag = 0
        for line in role_information:
            if role == line["role"] and pwd == line["password"]:  # 如果 role 和 key双双都能对上
                flag = 1
                return_json = {"staff": role, "orderId": None, "message": "Login success"}
        if flag == 0:  # 只要其中一个有错 或者对不上
            return_json = {"role": None, "orderId": None, "message": "Login fail"}
    elif (transfer_data["staff"] is not None) and (transfer_data["key"] is None):  # role不能none，但是key是none
        return_json = {"role": None, "orderId": None, "message": "Login fail"}
    else:  # 身份为customer的行为
        table_post = int(transfer_data["table"])
        diner_post = int(transfer_data["diner"])
        order_post = Orders(table=table_post, diner=diner_post)
        order_post.save()  # 往order表里加数据
        last_order = Orders.query.order_by(Orders.orderId.desc()).first()  # 取出表里最后一条数据
        print(model_to_dict(last_order))
        return_json = {"role": "customer", "orderId": model_to_dict(last_order)["orderId"], "message": "success"}
    return Response(json.dumps(return_json), mimetype="application/json")


@app.route('/customer/<int:order_id>', methods=["POST"])  # order submit interface
def order_submit(order_id):
    objects = []
    transfer_data = json.loads(json.dumps(request.get_json()))  # json格式传过来的信息
    target_order = Orders.query.get_or_404(order_id) # 得到目标订单，订单必须已在数据库中
    return_json = {"orderId": order_id} # 返回json样式
    if target_order.orderTime == None: # 只有orderTime为空，才能写入当前时间，如果不为空，不能改，会破坏点单的顺序
        Orders.query.filter_by(orderId=order_id).update({Orders.orderTime: datetime.now()})
        db.session.commit()
    if target_order.status == "Completed": # 如果当前订单显示completed，又有加菜的单子进来，要把状态改成processing
        Orders.query.filter_by(orderId=order_id).update({Orders.status: "Processing"})
        for dish in transfer_data["orderList"]:
            if int(dish["dishNumber"]) > 1: # 如果显示该dish点的数量超过1，那就要生成多条数据
                for i in range(0, int(dish["dishNumber"])):
                    item_post = Orderitem(dishId=dish["dishId"], orderId=order_id, itemTime=datetime.now())
                    objects.append(item_post)
            else: # 如果显示该dish点的数量为1，那就要生成1条数据
                item_post = Orderitem(dishId=dish["dishId"], orderId=order_id, itemTime=datetime.now())
                objects.append(item_post)
        db.session.add_all(objects) # 多条dish的数据一起插入数据表中
        db.session.commit()
    else:
        for dish in transfer_data["orderList"]:
            if int(dish["dishNumber"]) > 1:
                for i in range(0, int(dish["dishNumber"])):
                    item_post = Orderitem(dishId=dish["dishId"], orderId=order_id, itemTime=datetime.now())
                    objects.append(item_post)
            else:
                item_post = Orderitem(dishId=dish["dishId"], orderId=order_id, itemTime=datetime.now())
                objects.append(item_post)
        db.session.add_all(objects)
        db.session.commit()
    return Response(json.dumps(return_json), mimetype="application/json")


@app.route('/customer/<int:order_id>', methods=["GET"])  # get order interface
def get_order_detail(order_id):
    return_json = []
    target_order = Orders.query.get_or_404(order_id).orderitems # 获得该orderId下所有dishes
    target_order = model_to_dict(target_order)
    dish_sort = sorted(target_order, key=lambda x: (x["dishId"], x["status"])) # 排序
    dish_group = groupby(dish_sort, key=lambda x: x["dishId"]) # 按照dishId聚类
    for key, group in dish_group:
        dish_info = model_to_dict(Menuitem.query.filter_by(dishId=key).all())
        dish_info[0].pop("id") # 舍弃id
        dish_info[0].pop("lastModified") # 舍弃修改时间
        dish_info[0]["dishNumber"] = len(list(group)) # 点的dish的数量
        return_json.append(dish_info[0])
    return Response(json.dumps({"itemList": return_json}), mimetype="application/json")


@app.route('/customer/<int:order_id>/bill', methods=["GET"])  # get bill interface，逻辑和get order detail 一样
def get_bill(order_id):
    return_json = []
    target_order = Orders.query.get_or_404(order_id).orderitems
    target_order = model_to_dict(target_order)
    dish_sort = sorted(target_order, key=lambda x: (x["dishId"], x["status"]))
    dish_group = groupby(dish_sort, key=lambda x: x["dishId"])
    for key, group in dish_group:
        dish_info = model_to_dict(Menuitem.query.filter_by(dishId=key).all())
        dish_info[0].pop("id")  # 舍弃id
        dish_info[0].pop("lastModified")  # 舍弃修改时间
        dish_info[0]["dishNumber"] = len(list(group))  # 点的dish的数量
        return_json.append(dish_info[0])
    return Response(json.dumps({"itemList": return_json}), mimetype="application/json")


@app.route('/customer/<int:order_id>/hot', methods=["GET"])
def hot_dishes(order_id):
    order_id_post = int(order_id)
    diner_post = Orders.query.get_or_404(order_id_post).diner
    print(order_id_post)
    hot_dish_dict = Menuitem.query.order_by(Menuitem.orderTimes.desc()).limit(9)
    hot_dish_dict = model_to_dict(hot_dish_dict)
    for line in hot_dish_dict:
        line.pop("lastModified")
        line.pop("id")
        line["dishNumber"] = 0
    print(hot_dish_dict)
    category_post = Category.query.all()
    category_post = model_to_dict(category_post)
    for line in category_post:
        line.pop("id")
        line.pop("lastModified")
    return_json = {"orderId": order_id_post, "diner": diner_post, "itemList": hot_dish_dict, "categoryList": category_post}
    return Response(json.dumps(return_json), mimetype="application/json")


@app.route('/customer/<int:order_id>/<int:category_id>', methods=["GET"])
def category_dishes(order_id, category_id):
    order_id_post = int(order_id)
    category_id_post = int(category_id)
    dishes_dict = Menuitem.query.filter_by(categoryId=category_id_post).all()
    dishes_dict = model_to_dict(dishes_dict)
    for line in dishes_dict:
        line.pop("id")
        line.pop("lastModified")
        line["dishNumber"] = 0
    return_json = {"itemList": dishes_dict}
    return Response(json.dumps(return_json), mimetype="application/json")


@app.route('/add_category', methods=["POST"])  # 添加新的类目
def add_category():
    category_id_list = []
    category_name_list = []
    category_list = Category.query.all()
    print(category_list)
    category_dict = model_to_dict(category_list)
    print(category_dict)
    if not category_dict:
        category_id_max_cur = 1
    else:
        for line in category_dict:
            category_id_list.append(line["category_id"])
            category_name_list.append(line["category_name"])
        print(category_id_list)
        print(category_name_list)
        category_id_max_cur = max(category_id_list) + 1
    post_data = json.loads(json.dumps(request.get_json()))  # json格式传过来
    Category_name = str(post_data["category_name"]).strip().replace(r'-_|\/?,><;:"}]{[+=)(*&^%$#@!`~', ' ')
    if Category_name in category_name_list:
        return {"code": 1, "msg": "Already in category_table"}
    else:
        category = Category(categoryId=category_id_max_cur, categoryName=Category_name, lastModified=datetime.now())
        category.save()
        return {"code": 0}


def upload_picture(original_local_picture_address):  # 图片转存功能
    end_name = original_local_picture_address.rsplit('.')[-1]  # 判定图片的文件格式
    if end_name not in ["jpg", "png", "jpeg"]:
        return {"msg": "the format is not a valid picture"}
    all_files = os.listdir("../frontend/public/dishImg")  # 读取这个路径下的文件
    file_list = []
    for file in all_files:
        file = file[3:]
        file_num = file[:-4]
        file_list.append(int(file_num))
    cur_file_num = max(file_list) + 1
    filename = str('img{}'.format(str(cur_file_num)) + "." + end_name)  # 生成新的文件名，避免重复
    img_path = os.path.join("../frontend/public/dishImg", filename)  # 拼接转存路径和新的文件名
    print("img_path: ", img_path)
    shutil.copy(original_local_picture_address, img_path)  # 把旧路径下的文件复制到新的路径下
    img_path_post = img_path[18:]
    return img_path_post  # 返回新的路径


@app.route('/add_menuitem', methods=["GET", "POST"])  # 添加新的菜品
def add_menuitem():
    if request.method == "GET":
        items_list = Menuitem.query.all()
        items_dict = model_to_dict(items_list)
        return jsonify(items_dict)
    else:
        post_data = json.loads(json.dumps(request.get_json()))  # json格式传过来
        category_name_post = post_data["category_name"]
        print(category_name_post)
        category_line = Category.query.filter_by(categoryName=category_name_post).first()
        category_line = model_to_dict(category_line)
        print(category_line)
        category_id_post = int(category_line["category_id"])
        print(category_id_post)
        title_post = str(post_data["title"]).strip().replace(r'-_|\/?,><;:"}]{[+=)(*&^%$#@!`~', ' ')
        description_post = str(post_data['description'])
        ingredient_post = str(post_data["ingredient"])
        cost_post = float(post_data["cost"])
        calorie_post = float(post_data["calorie"])

        picture_post = str(post_data["picture"])  # post上来的图片的原路径
        print(picture_post)
        picture_post_address = upload_picture(picture_post)  # 图片的转存功能，返回的是转存后的路径
        print("img_path_post: ", picture_post_address)

        dish_id_list = []
        dish_list = Menuitem.query.all()
        print(dish_list)
        dish_dict = model_to_dict(dish_list)
        print(dish_dict)
        if dish_dict == []:
            dish_id_max_cur = 1
        else:
            for line in dish_dict:
                dish_id_list.append(line["dish_id"])
            print(dish_id_list)
            dish_id_max_cur = max(dish_id_list) + 1

        menu_item_post = Menuitem(dishId=dish_id_max_cur, categoryId=category_id_post,
                                  categoryName=category_name_post, title=title_post, description=description_post,
                                  ingredient=ingredient_post, cost=cost_post, picture=picture_post_address,
                                  calorie=calorie_post, lastModified=datetime.now())
        # menu_item_post.save()
        return {"code": 0}


if __name__ == '__main__':
    db.create_all()  # 创建数据表
    app.run(debug=True, host='127.0.0.1', port=8080, threaded=True)
    pass
