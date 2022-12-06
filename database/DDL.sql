SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

DROP TABLE IF EXISTS `Sales`;
DROP TABLE IF EXISTS `Products`;
DROP TABLE IF EXISTS `Plants`;
DROP TABLE IF EXISTS `Customers`;
DROP TABLE IF EXISTS `Employees`;
DROP TABLE IF EXISTS `InvoiceDetails`;

CREATE TABLE Employees (
    idEmployee int NOT NULL AUTO_INCREMENT UNIQUE,
    payRate int NOT NULL,
    firstName varChar(145) NOT NULL,
    lastName varChar(145) NOT NULL,
    email varChar(145) NOT NULL UNIQUE,
    phone int NOT NULL UNIQUE,
    address varChar(145) NOT NULL,
    PRIMARY KEY(idEmployee)
  );

CREATE TABLE Customers (
    idCustomer int NOT NULL AUTO_INCREMENT,
    firstName varChar(145) NOT NULL,
    lastName varChar(145) NOT NULL,
    email varChar(145) NOT NULL UNIQUE,
    phone int NOT NULL UNIQUE,
    address varChar(145),
    PRIMARY KEY(idCustomer)
);

CREATE TABLE Plants (
    idPlant int NOT NULL AUTO_INCREMENT UNIQUE,
    plantName varChar(145) NOT NULL,
    lighting varChar(145) NOT NULL,
    water varChar(145) NOT NULL,
    season varChar(145) NOT NULL,
    isToxic tinyint(1) NOT NULL,
    PRIMARY KEY(idPlant)
  );

CREATE TABLE Products (
      idProduct int NOT NULL AUTO_INCREMENT UNIQUE,
      name varChar(145) NOT NULL,
      price decimal(5,2) NOT NULL,
      idPlant int,
      PRIMARY KEY(idProduct),
      FOREIGN KEY (idPlant) REFERENCES Plants(idPlant) ON DELETE CASCADE

  );

  CREATE TABLE InvoiceDetails (
    invoiceDetailsID int NOT NULL AUTO_INCREMENT,
    idSale int,
    idProduct int,
    orderQty int,
    unitPrice decimal(10,2),
    lineTotal decimal(18,2),
    PRIMARY KEY(invoiceDetailsID),
    CONSTRAINT FK_InvoiceDetails_idSale FOREIGN KEY (idSale) REFERENCES Sales(idSale),
    CONSTRAINT FK_InvoiceDetails_idProduct FOREIGN KEY (idProduct) REFERENCES Products(idProduct)
  );

CREATE TABLE Sales(
    idSale int NOT NULL AUTO_INCREMENT UNIQUE,
    purchaseDate date NOT NULL,
    totalProducts int NOT NULL,
    idCustomer int NOT NULL,
    idEmployee int NOT NULL,
    FOREIGN KEY (idCustomer) REFERENCES Customers(idCustomer) ON DELETE CASCADE,
    FOREIGN KEY (idEmployee) REFERENCES Employees(idEmployee) ON DELETE CASCADE,
    PRIMARY KEY (idSale)
  );
  
INSERT INTO Employees (payRate,firstName,lastName,email,phone,address)
VALUES (12,'Joe','Suba','j.suba@hello.com',1234567890,'705 Lame St. Corvallis, OR 97330'),
(12,'Stephanie','Chavez','scha123@hello.com',1230987654,'12345 Generic Cir. Corvallis, OR 97330'),
(14,'Joussy','Smith','smithjou@hello.com',1236667898,'333 9th St. Corvallis OR 97330'),
(15,'Elle','Lopez','ellelopez_4@hello.com',1234657789,'405 Beaver Rd. Corvallis, OR 97330'),
(12,'Hannah','Winn','hanwinn@hello.com',1239804673,'903 Dam Ln. Corvallis, OR 97730');

INSERT INTO Customers (firstName,lastName,email,phone,address)
VALUES ('Natalie','Hill','nathill123@hello.com',1238379234,'8973 Reser St. Corvallis, OR 97330'),
('Brennan','Reimer','reimerbren15@hello.com',1237477294,'238 Sackett Cir. Corvallis, OR 97330'),
('John','Rosario','johnnnros@hello.com',1232348963,'2345 Linc St. Corvallis, OR 97330'),
('Mel','McGregor','melmcg44@hello.com',1232347789,'9327 Dearborn Rd. Corvallis, OR 97330'),
('Cesar','Nguyen','nguyendelces@hello.com',1238883689,'2345 Austin Ln. Corvallis, OR 97730');

INSERT INTO Plants (plantName,lighting, water, season, isToxic)
VALUES("AC Kahuna Dahlia","Full Sun","Once per week","Late Spring",1),
("Bird of Paradise","Full Sun","1-2 weeks","Perennial",0),
("Monstera","Full - Partial Sun","1-2 week","Perennial",1);

INSERT INTO Products (name,price,idPlant)
VALUES("Sally's All Purpose Plant Food",12.99, NULL),
("AC Kahuna Dahlia",9.95,1),
("Bird of Paradise",50.99,2),
("Monstera",15.99,3),
("6 inch Ceramic Planter",15.99, NULL);

INSERT INTO InvoiceDetails (idSale,idProduct,orderQty,unitPrice,lineTotal)
Values (1,2,3,9.95,29.85),
(1,1,1,12.99,12.99),
(2,4,1,15.99,15.99),
(3,2,3,9.95,29.85),
(4,3,2,50.99,101.98),
(5,5,1,15.99,15.99);

INSERT INTO Sales (purchaseDate,idEmployee,totalProducts,idCustomer)
VALUES ('2022-10-01', (SELECT idEmployee FROM Employees WHERE idEmployee = 2),4,(SELECT idCustomer FROM Customers WHERE idCustomer = 4)),
('2022-10-01',(SELECT idEmployee FROM Employees WHERE idEmployee = 2),1,(SELECT idCustomer FROM Customers WHERE idCustomer = 2)),
('2022-10-03',(SELECT idEmployee FROM Employees WHERE idEmployee = 4),3,(SELECT idCustomer FROM Customers WHERE idCustomer = 3)),
('2022-10-12',(SELECT idEmployee FROM Employees WHERE idEmployee = 1),2,(SELECT idCustomer FROM Customers WHERE idCustomer = 5)),
('2022-10-13',(SELECT idEmployee FROM Employees WHERE idEmployee = 5),1,(SELECT idCustomer FROM Customers WHERE idCustomer = 1));

SET FOREIGN_KEY_CHECKS=1;
COMMIT;
