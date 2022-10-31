import os
import shutil
import pymysql
import datetime

import sqlalchemy.orm.exc
from flask import Flask, render_template, request, Response, jsonify
from flask_restx import Resource, Api, reqparse, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta
import json
from flask_cors import CORS
from itertools import groupby
from sqlalchemy import create_engine, func
import pandas as pd
import sys

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
    name = db.Column(db.String(255))
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
    orderTimes = db.Column(db.INT, default=0)
    lastModified = db.Column(db.DateTime, nullable=False)


class Orders(Base):
    __tablename__ = "orders"

    orderId = db.Column(db.INT, primary_key=True, autoincrement=True)
    orderTime = db.Column(db.DateTime)
    table = db.Column(db.INT, nullable=False)
    diner = db.Column(db.INT, nullable=False)
    status = db.Column(db.String(45), nullable=False, default="Wait")
    isRequest = db.Column(db.Integer, nullable=False, default=0)
    isPay = db.Column(db.Integer, nullable=False, default=0)
    payTime = db.Column(db.DateTime)
    orderitems = db.relationship("Orderitem", backref='orders')


class Orderitem(Base):
    __tablename__ = "orderItems"

    itemIndex = db.Column(db.INT, primary_key=True, autoincrement=True)
    dishId = db.Column(db.INT, nullable=False)
    orderId = db.Column(db.INT, db.ForeignKey("orders.orderId"))
    itemTime = db.Column(db.DateTime)
    status = db.Column(db.String(45), nullable=False, default="Wait")
    finish = db.Column(db.INT, nullable=False, default=0)


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


########################################################################################################################
######################################### Login Module #################################################################
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


########################################################################################################################
############################################   Login Module   ##########################################################


########################################################################################################################
##########################################   Customer Module   #########################################################
@app.route('/customer/<int:order_id>', methods=["POST"])  # order submit interface
def order_submit(order_id):
    objects = []
    transfer_data = json.loads(json.dumps(request.get_json()))  # json格式传过来的信息
    target_order = Orders.query.get_or_404(order_id)  # 得到目标订单，订单必须已在数据库中
    return_json = {"orderId": order_id}  # 返回json样式
    if target_order.orderTime == None:  # 只有orderTime为空，才能写入当前时间，如果不为空，不能改，会破坏点单的顺序
        Orders.query.filter_by(orderId=order_id).update({Orders.orderTime: datetime.now()})
        db.session.commit()
    if target_order.status == "Completed":  # 如果当前订单显示completed，又有加菜的单子进来，要把状态改成processing
        Orders.query.filter_by(orderId=order_id).update({Orders.status: "Processing"})
        for dish in transfer_data["orderList"]:
            if int(dish["dishNumber"]) > 1:  # 如果显示该dish点的数量超过1，那就要生成多条数据
                for i in range(0, int(dish["dishNumber"])):
                    item_post = Orderitem(dishId=dish["dishId"], orderId=order_id, itemTime=datetime.now())
                    objects.append(item_post)
                    Menuitem.query.filter_by(dishId=dish["dishId"]).update(
                        {Menuitem.orderTimes: Menuitem.orderTimes + 1})
            else:  # 如果显示该dish点的数量为1，那就要生成1条数据
                item_post = Orderitem(dishId=dish["dishId"], orderId=order_id, itemTime=datetime.now())
                objects.append(item_post)
                Menuitem.query.filter_by(dishId=dish["dishId"]).update(
                    {Menuitem.orderTimes: Menuitem.orderTimes + 1})  # 点的菜的点单数量加1
        db.session.add_all(objects)  # 多条dish的数据一起插入数据表中
        db.session.commit()
    else:
        for dish in transfer_data["orderList"]:
            if int(dish["dishNumber"]) > 1:
                for i in range(0, int(dish["dishNumber"])):
                    item_post = Orderitem(dishId=dish["dishId"], orderId=order_id, itemTime=datetime.now())
                    objects.append(item_post)
                    Menuitem.query.filter_by(dishId=dish["dishId"]).update(
                        {Menuitem.orderTimes: Menuitem.orderTimes + 1})
            else:
                item_post = Orderitem(dishId=dish["dishId"], orderId=order_id, itemTime=datetime.now())
                objects.append(item_post)
                Menuitem.query.filter_by(dishId=dish["dishId"]).update({Menuitem.orderTimes: Menuitem.orderTimes + 1})
        db.session.add_all(objects)
        db.session.commit()
    return Response(json.dumps(return_json), mimetype="application/json")


@app.route('/customer/<int:order_id>', methods=["GET"])  # get order interface
def get_order_detail(order_id):
    return_json = []
    target_order = Orders.query.get_or_404(order_id).orderitems  # 获得该orderId下所有dishes
    target_order = model_to_dict(target_order)
    dish_sort = sorted(target_order, key=lambda x: (x["dishId"], x["status"]))  # 排序
    dish_group = groupby(dish_sort, key=lambda x: x["dishId"])  # 按照dishId聚类
    for key, group in dish_group:
        dish_info = model_to_dict(Menuitem.query.filter_by(dishId=key).all())
        dish_info[0].pop("id")  # 舍弃id
        dish_info[0].pop("lastModified")  # 舍弃修改时间
        dish_info[0]["dishNumber"] = len(list(group))  # 点的dish的数量
        return_json.append(dish_info[0])
    return Response(json.dumps({"itemList": return_json}), mimetype="application/json")


@app.route('/customer/<int:order_id>/bill', methods=["GET"])  # get bill interface，逻辑和get order detail 一样
def get_bill(order_id):
    return_json = []
    Orders.query.filter_by(orderId=order_id).update({Orders.isRequest: 1})  # 把isRequest的状态改成1
    db.session.commit()
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
    return_json = {"orderId": order_id_post, "diner": diner_post, "itemList": hot_dish_dict,
                   "categoryList": category_post}
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


@app.route('/customer/<int:order_id>/help', methods=["POST"])
def ask_help(order_id):
    table_no = Orders.query.get_or_404(order_id).table
    print(table_no)
    service_info = Services(table=table_no, startTime=datetime.now())
    service_info.save()
    return_json = {"message": "success"}
    return Response(json.dumps(return_json), mimetype="application/json")


########################################################################################################################
############################################  Customer Module  #########################################################


########################################################################################################################
############################################   Wait Staff Module  ######################################################
@app.route('/wait/request', methods=["GET"])
def init_request():
    uncompleted_services = Services.query.filter_by(status=0).all()
    uncompleted_services = model_to_dict(uncompleted_services)
    for line in uncompleted_services:
        line.pop("endTime")
        line.pop("status")
        if line["startTime"] is not None:
            line["startTime"] = line["startTime"].strftime("%Y-%m-%d-%H:%M:%S")
    return_json = {"requestsList": uncompleted_services}
    return Response(json.dumps(return_json), mimetype="application/json")


@app.route('/wait/request/<int:request_id>', methods=["POST"])
def request_finish(request_id):
    Services.query.filter_by(id=request_id).update({Services.endTime: datetime.now(), Services.status: 1})
    db.session.commit()
    return_json = {"message": "success"}
    return Response(json.dumps(return_json), mimetype="application/json")


@app.route('/wait/item', methods=["GET"])
def get_uncompleted_order_item():
    uncompleted_order_item = model_to_dict(Orderitem.query.filter(Orderitem.status == "Prepared", Orderitem.finish == 0)
                                           .order_by(Orderitem.itemTime.asc()).all())
    for line in uncompleted_order_item:
        line["table"] = Orders.query.get_or_404(line["orderId"]).table
        line.pop("orderId")
        line.pop("status")
        line.pop("finish")
        # line.pop("itemTime")
        if line["itemTime"] is not None:
            line["itemTime"] = line["itemTime"].strftime("%Y-%m-%d-%H:%M:%S")
        line["dishName"] = model_to_dict(Menuitem.query.filter_by(dishId=line["dishId"]).all())[0]["title"]
        line.pop("dishId")
    return_json = {"itemsList": uncompleted_order_item}
    return Response(json.dumps(return_json), mimetype="application/json")


@app.route('/wait/item/<int:item_index>', methods=["POST"])
def item_complete(item_index):
    Orderitem.query.filter_by(itemIndex=item_index).update({Orderitem.finish: 1})
    db.session.commit()
    return_json = {"message": "success"}
    return Response(json.dumps(return_json), mimetype="application/json")


@app.route('/wait/order', methods=["GET"])
def get_unpayed_order():
    unpayed_order = model_to_dict(
        Orders.query.filter(Orders.orderTime.isnot(None), Orders.isPay == 0).order_by(Orders.orderTime.asc()).all())
    for line in unpayed_order:
        total_cost = 0
        order_items = model_to_dict(Orders.query.get_or_404(line["orderId"]).orderitems)
        for each_item in order_items:
            menu_item = model_to_dict(Menuitem.query.filter_by(dishId=each_item["dishId"]).all())
            total_cost += menu_item[0]["cost"]
            each_item["price"] = menu_item[0]["cost"]
            each_item["dishName"] = menu_item[0]["title"]
            each_item.pop("itemTime")
            each_item.pop("itemIndex")
            each_item.pop("dishId")
            each_item.pop("finish")
            # each_item.pop("orderId")
        line["price"] = round(total_cost, 1)
        line["itemList"] = order_items
        line.pop("diner")
        line.pop("payTime")
        line.pop('status')
        line.pop("isPay")
        # line.pop("orderTime")
        if line["orderTime"] is not None:
            line["orderTime"] = line["orderTime"].strftime("%Y-%m-%d-%H:%M:%S")
    return_json = {"orderList": unpayed_order}
    return Response(json.dumps(return_json), mimetype="application/json")


@app.route('/wait/order/<int:order_id>', methods=["POST"])  # 是否需要isRequest也变成1的条件下才能付款？？？
def confirm_pay_order(order_id):
    Orders.query.filter_by(orderId=order_id).update({Orders.isPay: 1, Orders.payTime: datetime.now()})
    db.session.commit()
    return_json = {"message": "success"}
    return Response(json.dumps(return_json), mimetype="application/json")


########################################################################################################################
############################################   kitchen Staff Module  ###################################################
engine = create_engine(
    'mysql+pymysql://admin:z12345678@bug-team.cxba7lq9tfkj.ap-southeast-2.rds.amazonaws.com:3306/wait_management')


@app.route('/kitchen', methods=["GET", "POST"])
def get_orders():
    order_sql = """select allItem.orderId,allItem.`table`,allItem.orderTime,ifnull(waitItem.waitCount,0)as waitCount,allItem.`status`from(select wait_management.orders.orderId,wait_management.orders.`table`,wait_management.orders.orderTime,count(wait_management.orderItems.dishId)as allCount,wait_management.orders.`status`,(case when wait_management.orders.`status`='Wait'or wait_management.orders.`status`='Processing'then 0 when wait_management.orders.`status`='Completed'then 1 end)as srank from wait_management.orders join wait_management.orderItems on wait_management.orders.orderId=wait_management.orderItems.orderId where DATE_FORMAT(wait_management.orders.orderTime,'%%Y-%%m-%%d')=DATE_FORMAT(now(),'%%Y-%%m-%%d')group by wait_management.orders.orderId)as allItem left join(select wait_management.orders.orderId,count(wait_management.orderItems.dishId)as waitCount from wait_management.orders join wait_management.orderItems on wait_management.orders.orderId=wait_management.orderItems.orderId where DATE_FORMAT(wait_management.orders.orderTime,'%%Y-%%m-%%d')=DATE_FORMAT(now(),'%%Y-%%m-%%d')and wait_management.orderItems.`status`='Wait'group by wait_management.orders.orderId)as waitItem on allItem.orderId=waitItem.orderId order by allItem.srank,allItem.orderTime"""
    with engine.connect() as conn:
        result_proxy = conn.execute(order_sql)  # 返回值为ResultProxy类型
        result = result_proxy.fetchall()  # 返回值为元组list，每个元组为一条记录
        res = pd.DataFrame(list(result), columns=['orderId', 'table', 'orderTime', 'waitCount', 'status'])  # 将结果转存为DF

    if request.method == "GET":  # 默认返回排序后的order列表
        return {"orderList": res.to_dict(orient='records')}

    else:
        post_data = json.loads(json.dumps(request.get_json()))  # 获取到status
        status_post = str(post_data["orderStatus"])
        filter_res = res[res['status'] == status_post]
        return {"orderList": filter_res.to_dict(orient='records')}


@app.route('/kitchen/<int:order_id>', methods=["GET"])
def get_items(order_id):
    table_time_sql = """select`table`,orderTime from wait_management.orders where orderId=""" + str(order_id)
    item_sql = """select itemIndex,title,categoryName,`status`from(select wait_management.orderItems.itemIndex,wait_management.orderItems.`status`,wait_management.menuItems.title,wait_management.menuItems.categoryName,(case when wait_management.orderItems.`status`='Wait'then 0 when wait_management.orderItems.`status`='Processing'then 1 when wait_management.orderItems.`status`='Prepared'then 2 end)as srank,rank()over(order by wait_management.orderItems.itemTime)as trank from wait_management.orders join wait_management.orderItems on wait_management.orders.orderId=wait_management.orderItems.orderId join wait_management.menuItems on wait_management.orderItems.dishId=wait_management.menuItems.dishId where wait_management.orders.orderId=""" + str(
        order_id) + """)as items order by srank,trank"""
    with engine.connect() as conn:
        result_proxy = conn.execute(table_time_sql)  # 返回值为ResultProxy类型
        table_time_result = result_proxy.fetchall()  # 返回值为元组list，每个元组为一条记录
        result_proxy = conn.execute(item_sql)
        item_result = result_proxy.fetchall()
        item_res = pd.DataFrame(list(item_result), columns=['itemIndex', 'itemName', 'itemCategory', 'status'])
    return {"tableNumber": table_time_result[0][0], "orderTime": table_time_result[0][1],
            "itemList": item_res.to_dict(orient='records')}


@app.route('/kitchen/<int:order_id>', methods=["POST"])
def update_items(order_id):
    post_data = json.loads(json.dumps(request.get_json()))  # 获取到status
    index_post = int(post_data["itemIndex"])
    status_post = str(post_data["itemStatus"])
    db.session.query(Orderitem).filter(Orderitem.itemIndex == index_post).update({"status": status_post})
    db.session.commit()  # 更新item的status

    # 更新order的status
    res_all = \
        db.session.query(func.count(Orderitem.itemIndex)).join(Orders).filter(Orders.orderId == order_id).all()[0][0]
    res_prepared = \
        db.session.query(func.count(Orderitem.itemIndex)).join(Orders).filter(Orders.orderId == order_id).filter(
            Orderitem.status == "Prepared").all()[0][0]
    res_processing = \
        db.session.query(func.count(Orderitem.itemIndex)).join(Orders).filter(Orders.orderId == order_id).filter(
            Orderitem.status == "Processing").all()[0][0]
    res_wait = db.session.query(func.count(Orderitem.itemIndex)).join(Orders).filter(Orders.orderId == order_id).filter(
        Orderitem.status == "Wait").all()[0][0]

    if res_all == res_prepared:
        db.session.query(Orders).filter(Orders.orderId == order_id).update({"status": "Completed"})
        db.session.commit()

    if res_all == res_wait:
        db.session.query(Orders).filter(Orders.orderId == order_id).update({"status": "Wait"})
        db.session.commit()

    if res_processing > 0 and res_prepared < res_all:
        db.session.query(Orders).filter(Orders.orderId == order_id).update({"status": "Processing"})
        db.session.commit()

    return {"orderId": order_id}


########################################################################################################################
############################################   kitchen Staff Module  ###################################################

########################################################################################################################
###############################################   Manager Module  ######################################################


def update_function(original_data, update_data):  # 更新功能
    flag = 0
    for key, value in update_data.items():
        if getattr(original_data, key) != value:  # judge data whether changes
            if key == "categoryName":
                update_category_id = Category.query.filter_by(categoryName=value).first().categoryId
                setattr(original_data, "categoryId", update_category_id)
                flag = 1
            if key == "picture":
                #original_data_address = original_data.picture
                #delete_picture(original_data_address)
                if update_data["picture"][0:3] != "../":
                    update_data["picture"] = ".." + update_data["picture"]
                new_img_address = upload_picture(update_data["picture"])
                setattr(original_data, "picture", new_img_address)
                flag = 1
            else:
                setattr(original_data, key, value)  # set new data
                flag = 1
        if flag == 1:
            original_data.lastModified = datetime.now()
    return original_data


def upload_picture(original_local_picture_address):  # 图片转存功能
    root = "../frontend/public/dishImg"
    upload_picture_address = "../frontend/public" + str(original_local_picture_address[2:])
    print(upload_picture_address)
    end_name = original_local_picture_address.rsplit('.')[-1]  # 判定图片的文件格式
    print(end_name)
    if end_name not in ["jpg", "png", "jpeg"]:
        return {"msg": "the format is not a valid picture"}
    # all_files = os.listdir(root)  # 读取这个路径下的文件
    filename = str(original_local_picture_address[11:])  # 生成新的文件名，避免重复
    print(filename)
    img_path = os.path.join(root, filename)  # 拼接转存路径和新的文件名
    print("img_path: ", img_path)
    # shutil.copy(upload_picture_address, img_path)  # 把旧路径下的文件复制到新的路径下
    img_path_post = img_path[18:]
    img_path_post = str(img_path_post).replace("\\", "/")
    return img_path_post  # 返回新的路径


def delete_picture(picture_address_in_database):  # 删除图片
    root = "../frontend/public/dishImg"
    all_pictures = os.listdir(root)  # 读取这个路径下的文件
    for picture_name in all_pictures:
        if picture_name == picture_address_in_database[9:]:
            os.remove(os.path.join(root, picture_name))
    return 0


def get_category_list(time_flag):  # 得到所有的类目
    category_list = model_to_dict(Category.query.all())
    if time_flag == 0:  # 有lastModified
        for line in category_list:
            line.pop("id")
            line["lastModified"] = line["lastModified"].strftime("%Y-%m-%d-%H:%M:%S")
        return_json = {"categoryList": category_list}
    else:  # 没有lastModified
        for line in category_list:
            line.pop("id")
            line.pop("lastModified")
        return_json = {"categoryList": category_list}
    return return_json


def get_menu_item_list():  # 得到所有的类目
    category_id_list = []
    item_list = []
    all_category = get_category_list(1)
    for each_category in all_category["categoryList"]:
        category_id_list.append(each_category["categoryId"])
    for category_id in category_id_list:
        menu_item = model_to_dict(Menuitem.query.filter_by(categoryId=category_id).all())
        for line in menu_item:
            line["dishName"] = line["title"]
            line["price"] = line["cost"]
            line.pop("cost")
            line.pop("title")
            line.pop("id")
            line.pop("lastModified")
            line.pop("categoryId")
            line.pop("orderTimes")
        item_list.append({"categoryId": category_id, "itemList": menu_item})
    return_json = {"itemList": item_list, "categoryList": all_category["categoryList"]}
    return return_json


@app.route('/manager/category', methods=["GET"])  # 获取所有类目
def get_category():
    return_json = get_category_list(0)
    return Response(json.dumps(return_json), mimetype="application/json")


@app.route('/manager/category/add', methods=["POST"])  # 添加新的类目
def add_category():
    category_id_list = []
    category_name_list = []
    category_dict = model_to_dict(Category.query.all())
    if not category_dict:
        category_id_max_cur = 1
    else:
        for line in category_dict:
            category_id_list.append(int(line["categoryId"]))
            category_name_list.append(str(line["categoryName"]).lower())
        category_id_max_cur = max(category_id_list) + 1
    post_data = json.loads(json.dumps(request.get_json()))  # json格式传过来
    category_name = str(post_data["categoryName"]).strip().replace(r'-_|\/?,><;:"}]{[+=)(*&^%$#@!`~', ' ')
    if category_name.lower() in category_name_list:
        return_json = {"message": "Duplicated category name"}
    else:
        category = Category(categoryId=category_id_max_cur, categoryName=category_name, lastModified=datetime.now())
        category.save()
        return_json = get_category_list(0)
    return Response(json.dumps(return_json), mimetype="application/json")


@app.route('/manager/item', methods=["GET"])  # 获取所有菜品
def get_menu_item():
    return_json = get_menu_item_list()
    return Response(json.dumps(return_json), mimetype="application/json")


@app.route('/manager/item/add', methods=["POST"])  # 添加新的菜品
def add_menu_item():
    post_data = json.loads(json.dumps(request.get_json()))  # json格式传过来
    title_post = str(post_data["title"]).strip().replace(r'-_|\/?,><;:"}]{[+=)(*&^%$#@!`~', ' ')
    try:
        category_name_post = post_data["categoryName"]
        category_line = Category.query.filter_by(categoryName=category_name_post).first()
        category_line = model_to_dict(category_line)
        category_id_post = int(category_line["categoryId"])
    except KeyError:
        category_name_post = None
        category_id_post = None
    try:
        description_post = str(post_data['description'])
    except KeyError:
        description_post = None
    try:
        ingredient_post = str(post_data["ingredient"])
    except KeyError:
        ingredient_post = None
    try:
        cost_post = float(post_data["cost"])
    except KeyError:
        cost_post = 0
    try:
        calorie_post = float(post_data["calorie"])
    except KeyError:
        calorie_post = 0

    try:
        picture_post = str(post_data["picture"])  # post上来的图片的原路径
        if picture_post[0:3] != "../":
            picture_post = ".." + picture_post
        picture_post_address = upload_picture(picture_post)  # 图片的转存功能，返回的是转存后的路径
        print("img_path_post: ", picture_post_address)
    except KeyError:
        picture_post = None

    dish_id_list = []
    dish_dict = model_to_dict(Menuitem.query.all())
    if dish_dict == []:
        dish_id_max_cur = 1
    else:
        for line in dish_dict:
            dish_id_list.append(line["dishId"])
        dish_id_max_cur = max(dish_id_list) + 1

    menu_item_post = Menuitem(dishId=dish_id_max_cur, categoryId=category_id_post,
                              categoryName=category_name_post, title=title_post, description=description_post,
                              ingredient=ingredient_post, cost=cost_post, picture=picture_post_address,
                              calorie=calorie_post, lastModified=datetime.now())
    menu_item_post.save()
    return_json = get_menu_item_list()
    return Response(json.dumps(return_json), mimetype="application/json")


@app.route('/manager/item/<int:dish_id>', methods=["POST"])  # 删除现有的菜品
def delete_menu_item(dish_id):
    menu_item_delete = Menuitem.query.filter_by(dishId=dish_id).first()
    # menu_item_delete_dict = model_to_dict(menu_item_delete)
    # if menu_item_delete_dict["picture"] is not None:
        # delete_picture(str(menu_item_delete_dict["picture"]))
    db.session.delete(menu_item_delete)
    db.session.commit()
    return_json = get_menu_item_list()
    return Response(json.dumps(return_json), mimetype="application/json")


@app.route('/manager/item/<int:dish_id>', methods=["PUT"])  # 更新现有的菜品
def edit_menu_item(dish_id):
    update_data = json.loads(json.dumps(request.get_json()))  # json格式传过来
    original_data = Menuitem.query.filter_by(dishId=dish_id).first()

    update_function(original_data, update_data)
    db.session.commit()
    return_json = get_menu_item_list()
    return Response(json.dumps(return_json), mimetype="application/json")


def get_all_key():
    key_list = model_to_dict(Key.query.order_by(Key.role.asc()).all())
    for line in key_list:
        line["key"] = line["password"]
        line.pop("password")
        line.pop("id")
    return {"keyList": key_list}


@app.route('/manager/key', methods=["GET"])  # 获得所有的key
def get_key():
    return_json = get_all_key()
    return Response(json.dumps(return_json), mimetype="application/json")


@app.route('/manager/key', methods=["POST"])  # add key
def add_key():
    return_json = {}
    manager_all_key = []
    kitchen_all_key = []
    wait_all_key = []
    post_data = json.loads(json.dumps(request.get_json()))  # json格式传过来
    key_dict = model_to_dict(Key.query.all())
    for line in key_dict:
        if line["role"] == "manager":
            manager_all_key.append(line["password"])
        elif line["role"] == "wait":
            wait_all_key.append(line["password"])
        else:
            kitchen_all_key.append(line["password"])
    if post_data["role"] == "manager":
        if post_data["key"] in manager_all_key:
            return_json = {"message": "Duplicated Key"}
        else:
            key_post = Key(role=post_data["role"], name=post_data["name"], password=post_data["key"])
            key_post.save()
            return_json = {"message": "success", "keyList": get_all_key()["keyList"]}
    elif post_data["role"] == "wait":
        if post_data["key"] in wait_all_key:
            return_json = {"message": "Duplicated Key"}
        else:
            key_post = Key(role=post_data["role"], name=post_data["name"], password=post_data["key"])
            key_post.save()
            return_json = {"message": "success", "keyList": get_all_key()["keyList"]}
    elif post_data["role"] == "kitchen":
        if post_data["key"] in kitchen_all_key:
            return_json = {"message": "Duplicated Key"}
        else:
            key_post = Key(role=post_data["role"], name=post_data["name"], password=post_data["key"])
            key_post.save()
            return_json = {"message": "success", "keyList": get_all_key()["keyList"]}
    return Response(json.dumps(return_json), mimetype="application/json")


@app.route('/manager/key', methods=["DELETE"])  # delete key
def delete_key():
    post_data = json.loads(json.dumps(request.get_json()))  # json格式传过来
    try:
        key_delete = Key.query.filter(Key.role == post_data["role"], Key.password == post_data["key"]).first()
        db.session.delete(key_delete)
        db.session.commit()
        return_json = get_all_key()
    except sqlalchemy.orm.exc.UnmappedInstanceError:
        return_json = {"message": "Invalid role and key"}
    return Response(json.dumps(return_json), mimetype="application/json")


@app.route('/manager/category', methods=["POST"])  # category sort
def category_sort():
    insert_id = 1
    new_sorted_category_list = []
    sort_data = json.loads(json.dumps(request.get_json()))  # json格式传过来
    for line in sort_data["categoryList"]:
        category_delete = Category.query.filter_by(categoryId=line["categoryId"]).first()
        db.session.delete(category_delete)
        new_sorted_category_list.append(Category(id=insert_id, categoryId=line["categoryId"],
                                                 categoryName=line["categoryName"], lastModified=datetime.now()))
        insert_id += 1
    db.session.add_all(new_sorted_category_list)
    db.session.commit()
    return Response(json.dumps(get_category_list(0)), mimetype="application/json")


@app.route('/manager/item', methods=["POST"])  # menu item sort
def sort_menu_item():
    sort_data = json.loads(json.dumps(request.get_json()))  # json格式传过来
    new_sorted_menu_item_list = []
    for line in sort_data["itemList"]:
        each_category_id = Menuitem.query.filter_by(categoryName=line["categoryName"]).first().categoryId
        each_item_order_times = Menuitem.query.filter_by(dishId=line["dishId"]).first().orderTimes
        menu_item_delete = Menuitem.query.filter_by(dishId=line["dishId"]).first()
        new_sorted_menu_item_list.append(Menuitem(dishId=line["dishId"], categoryId=each_category_id,
                                                  categoryName=line["categoryName"], title=line["dishName"],
                                                  description=line["description"],
                                                  ingredient=line["ingredient"], cost=line["price"],
                                                  picture=line["picture"],
                                                  calorie=line["calorie"], orderTimes=each_item_order_times,
                                                  lastModified=datetime.now()))
        db.session.delete(menu_item_delete)
    db.session.add_all(new_sorted_menu_item_list)
    db.session.commit()
    return_json = get_menu_item_list()
    return Response(json.dumps(return_json), mimetype="application/json")

########################################################################################################################
###############################################   Manager Module  ######################################################

if __name__ == '__main__':
    # port_number = int(sys.argv[1])
    # print(port_number)
    db.create_all()  # 创建数据表
    app.run(debug=True, host='127.0.0.1', port=8080, threaded=True)
    pass
