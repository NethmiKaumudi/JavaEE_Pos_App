DROP DATABASE IF EXISTS javaEE_pos_app;
CREATE DATABASE javaEE_pos_app;
USE javaEE_pos_app;

CREATE TABLE IF NOT EXISTS customer
(
    cId     VARCHAR(10),
    name    VARCHAR(30),
    address VARCHAR(100),
    salary  VARCHAR(25),
    CONSTRAINT PRIMARY KEY (cId)
);

CREATE TABLE IF NOT EXISTS item(
    code        VARCHAR(10),
    description       VARCHAR(30),
    unit_price  DOUBLE NOT NULL,
    qty_on_hand INTEGER,
    CONSTRAINT PRIMARY KEY (code)
);

CREATE TABLE IF NOT EXISTS orders
(
    oId      VARCHAR(10),
    date     DATE,
    cId      VARCHAR(10),
    total    DOUBLE,
    cash     DOUBLE,
    discount DOUBLE,
    balance  DOUBLE,
    CONSTRAINT PRIMARY KEY (oId),
    CONSTRAINT FOREIGN KEY (cId) REFERENCES customer (cId)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS order_detail
(
    order_ID  VARCHAR(10),
    code      VARCHAR(10),
    qty       INTEGER,
    unitPrice DECIMAL(8, 2),
    CONSTRAINT PRIMARY KEY (code, order_ID),
    CONSTRAINT FOREIGN KEY (order_ID) REFERENCES orders (oId)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FOREIGN KEY (code) REFERENCES item (code)
        ON DELETE CASCADE ON UPDATE CASCADE
);



INSERT INTO customer VALUES ('Ç001','Kamal','Matara','5000.00');