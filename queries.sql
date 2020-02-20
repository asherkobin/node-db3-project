-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.

SELECT P.ProductName, C.CategoryName FROM [Product] P
JOIN [Category] C ON P.CategoryId = C.Id

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.

SELECT O.Id, O.OrderDate AS OrderId, S.CompanyName
FROM [Order] O
JOIN [Shipper] S ON O.ShipVia = S.Id
WHERE O.OrderDate < '2012-08-09'

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.

SELECT P.ProductName AS [Name], O.Quantity
FROM [OrderDetail] O
JOIN [Product] P ON O.ProductId = P.Id
WHERE O.OrderId =10251
ORDER BY P.ProductName

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.

SELECT O.Id AS [Order Number], C.CompanyName AS [Company Name], E.LastName AS [Last Name]
FROM [Order] O
JOIN Customer C ON O.CustomerId = C.Id
JOIN Employee E ON O.EmployeeId = E.Id


-- STRETCH --

-- Displays CategoryName and a new column called Count that shows how many products are in each category. Shows 8 records.

SELECT C.CategoryName, COUNT(P.ProductID) AS [Count]
FROM Products P
JOIN Categories C ON P.CategoryID = C.CategoryID
GROUP BY CategoryName

-- Display OrderID and a column called ItemCount that shows the total number of products placed on the order. Shows 196 records.

SELECT OrderID, SUM(Quantity) AS ItemCount FROM OrderDetails GROUP BY OrderID