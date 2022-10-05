import os
import shutil

import pymysql
import datetime
from flask import Flask, render_template, jsonify, request, Response
from flask_restx import Resource, Api, reqparse, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources=r'/*')  # 解决跨域问题


class Config(object):
    # app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:hyt135565@localhost:3306/test_database"
    app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://admin:z12345678@bug-team.cxba7lq9tfkj.ap-southeast-2.rds.amazonaws.com:3306/wait_management" #连接数据库方式，连云数据库的方式
    app.config['SQLALCHEMY_TRACK_MODIFICATION'] = True
    # app.config['SQLALCHEMY_ECHO'] = True
    app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = False

    BASE_DIR = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
    MEDIA_ROOT = os.path.join(BASE_DIR, "COMP9900/static/picture")  # 这里要修改，改成项目的结构路径！！！


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
    table = db.Column(db.String(45), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime)
    status = db.Column(db.String(45), nullable=False, default=0)


class Category(Base):  # The structure of category table
    __tablename__ = "category"

    id = db.Column(db.INT, primary_key=True, autoincrement=True)
    category_id = db.Column(db.INT, nullable=False)
    category_name = db.Column(db.String(255), nullable=False)
    last_modified = db.Column(db.DateTime, nullable=False)


class Menuitem(Base):
    __tablename__ = "menu_items"

    id = db.Column(db.INT, primary_key=True, autoincrement=True)
    dish_id = db.Column(db.INT, nullable=False)
    categoryID = db.Column(db.Integer)
    category_name = db.Column(db.String(255))
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255))
    ingredient = db.Column(db.String(255))
    cost = db.Column(db.Float, default=0)
    picture = db.Column(db.String(255))
    calorie = db.Column(db.Float, default=0)
    orderTimes = db.Column(db.Integer)
    last_modified = db.Column(db.DateTime, nullable=False)


class Orders(Base):
    __tablename__ = "orders"

    orderId = db.Column(db.INT, primary_key=True, autoincrement=True)
    orderTime = db.Column(db.DateTime)
    table = db.Column(db.String(45), nullable=False)
    diner = db.Column(db.String(45), nullable=False)
    status = db.Column(db.String(45), nullable=False, default="wait")
    isPay = db.Column(db.Integer, nullable=False, default=0)
    payTime = db.Column(db.DateTime)
    orderitems = db.relationship("Orderitem", backref='orders')


class Orderitem(Base):
    __tablename__ = "order_items"

    itemIndex = db.Column(db.INT, primary_key=True, autoincrement=True)
    dishId = db.Column(db.INT, nullable=False)
    orderId = db.Column(db.INT, db.ForeignKey("orders.orderId"))
    itemTime = db.Column(db.DateTime)
    status = status = db.Column(db.String(45), nullable=False, default="wait")


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


def transfer_string(original_dict):
    if original_dict:
        for dicts in original_dict:
            for keys in dicts:
                dicts[keys] = str(dicts[keys])
    return original_dict


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
        return_json = {"role": "customer", "orderId": str(model_to_dict(last_order)["orderId"]), "message": "success"}
    return Response(json.dumps(return_json), mimetype="application/json")


@app.route('/customer/<int:order_id>/hot', methods=["GET"])
def hot_dishes(order_id):
    order_id_post = int(order_id)
    print(order_id_post)
    hot_dish_dict = Menuitem.query.order_by(Menuitem.orderTimes.desc()).limit(9)
    hot_dish_dict = model_to_dict(hot_dish_dict)
    for line in hot_dish_dict:
        line.pop("last_modified")
        line.pop("id")
    # hot_dish_dict = transfer_string(hot_dish_dict)
    print(hot_dish_dict)
    category_post = Category.query.all()
    category_post = model_to_dict(category_post)
    for line in category_post:
        line.pop("id")
        line.pop("last_modified")
    # category_post = transfer_string(category_post)
    return_json = {"orderId": str(order_id_post), "itemList": hot_dish_dict, "categoryList": category_post}
    return Response(json.dumps(return_json), mimetype="application/json")


@app.route('/customer/<int:order_id>/<int:category_id>', methods=["GET"])
def category_dishes(order_id, category_id):
    order_id_post = int(order_id)
    category_id_post = int(category_id)
    dishes_dict = Menuitem.query.filter_by(categoryID=category_id_post).all()
    dishes_dict = model_to_dict(dishes_dict)
    for line in dishes_dict:
        line.pop("id")
        line.pop("last_modified")
    # dishes_dict = transfer_string(dishes_dict)
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
        category = Category(category_id=category_id_max_cur, category_name=Category_name, last_modified=datetime.now())
        category.save()
        return {"code": 0}


def upload_picture(original_local_pitcture_address):  # 图片转存功能
    end_name = original_local_pitcture_address.rsplit('.')[-1]  # 判定图片的文件格式
    if end_name not in ["jpg", "png", "jpeg"]:
        return {"msg": "the format is not a valid picture"}

    all_files = os.listdir("static/picture")  # 读取这个路径下的文件
    print(len(all_files))
    MEDIA = Config.MEDIA_ROOT  # 需要存储的路径
    filename = str('img{}'.format(str(len(all_files) + 1))) + "." + end_name  # 生成新的文件名，避免重复
    img_path = os.path.join("static/picture", filename)  # 拼接转存路径和新的文件名
    print(img_path)
    shutil.copy(original_local_pitcture_address, img_path)  # 把旧路径下的文件复制到新的路径下
    return img_path  # 返回新的路径


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
        category_line = Category.query.filter_by(category_name=category_name_post).first()
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
        print(picture_post_address)

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

        menu_item_post = Menuitem(dish_id=dish_id_max_cur, categoryID=category_id_post,
                                  category_name=category_name_post, title=title_post, description=description_post,
                                  ingredient=ingredient_post, cost=cost_post, calorie=calorie_post,
                                  last_modified=datetime.now())
        # menu_item_post.save()
        return {"code": 0}


if __name__ == '__main__':
    db.create_all()  # 创建数据表
    app.run(debug=True, host='127.0.0.1', port=8080, threaded=True)
    pass
