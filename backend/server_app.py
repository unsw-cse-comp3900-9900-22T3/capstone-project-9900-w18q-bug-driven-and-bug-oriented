import pymysql
import datetime
from flask import Flask, render_template, jsonify, request
from flask_restx import Resource, Api, reqparse, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta
import json
from flask_cors import CORS


app = Flask(__name__)
CORS(app, resources=r'/*')# 解决跨域问题

class Config(object):
    #app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:hyt135565@localhost:3306/test_database"
    app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://admin:z12345678@bug-team.cxba7lq9tfkj.ap-southeast-2.rds.amazonaws.com:3306/wait_management" #连接数据库方式，连云数据库的方式
    app.config['SQLALCHEMY_TRACK_MODIFICATION'] = True
    #app.config['SQLALCHEMY_ECHO'] = True
    app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = False

app.config.from_object(Config)
db = SQLAlchemy(app)


class Base(db.Model): # 基础格式
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
    __tablename__="key"

    id = db.Column(db.INT, primary_key=True, autoincrement=True)
    role = db.Column(db.String(255))
    password = db.Column(db.String(255))

class Services(Base):  # The structure of category table
    __tablename__="service"

    id = db.Column(db.INT, primary_key=True, autoincrement=True)
    table = db.Column(db.String(45), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime)
    status = db.Column(db.String(45), nullable=False, default=0)

class Category(Base):  # The structure of category table
    __tablename__="category"

    id = db.Column(db.INT, primary_key=True, autoincrement=True)
    category_id = db.Column(db.INT, nullable=False)
    category_name = db.Column(db.String(255), nullable=False)
    last_modified = db.Column(db.Integer, nullable=False, default=0)

class Menuitem(Base):
    __tablename__="menu_items"

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
    __tablename__="orders_1"

    orderId = db.Column(db.INT, primary_key=True, autoincrement=True)
    orderTime = db.Column(db.DateTime)
    table = db.Column(db.String(45), nullable=False)
    diner = db.Column(db.String(45), nullable=False)
    status = db.Column(db.String(45), nullable=False, default="wait")
    isPay = db.Column(db.Integer, nullable=False, default=0)
    payTime = db.Column(db.DateTime)
    orderitems = db.relationship("Orderitem", backref='orders_1')


class Orderitem(Base):
    __tablename__="order_items_1"

    itemIndex = db.Column(db.INT, primary_key=True, autoincrement=True)
    dishId = db.Column(db.INT, nullable=False)
    orderId = db.Column(db.INT, db.ForeignKey("orders_1.orderId"))
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


@app.route('/staff', methods=["POST"]) # login interface
def login():
    transfer_data = json.loads(json.dumps(request.get_json()))  # json格式传过来的信息
    if transfer_data["role"] is not None and transfer_data["key"] is not None:
        role_information = db.session.query(Key).all() # 获取所有role和key的信息
        role_information = model_to_dict(role_information)
        role = transfer_data["role"]
        pwd = transfer_data["key"]
        flag = 0
        for line in role_information:
            if role == line["role"] and pwd == line["password"]: #如果 role 和 key双双都能对上
                flag = 1
                return jsonify({"role": role, "orderId": None, "message": "Login success"})
        if flag == 0: # 只要其中一个有错 或者对不上
            return jsonify({"role": None, "orderId": None, "message": "Login fail"})
    else: # 身份为customer的行为
        table_post = transfer_data["table"]
        diner_post = transfer_data["number"]
        order_post = Orders(table=table_post, diner=diner_post)
        order_post.save() # 往order表里加数据
        last_order = Orders.query.order_by(Orders.orderId.desc()).first() #取出表里最后一条数据
        print(model_to_dict(last_order))
        return jsonify({"role": "customer", "orderId": model_to_dict(last_order)["orderId"], "message": "success"})







if __name__ == '__main__':
    db.create_all() # 创建数据表
    app.run(debug=True, host='127.0.0.1', port=8080, threaded=True)
    pass
