# infotechtion-api-consumer - Assignment Task

## Summary

## This solution implement CRUD operation on SharePoint list.

## SharePoint List Details:

List Name: EmployeeData

List Columns:

i. FirstName - SLT
ii. LastName - SLT
iii. Gender - SLT
iv. Salary - Number

1. Get the SharePoint List Items and render into a Data Table (devextreme ui). Single row selection feature is enabled.

2. It has a custom form, to perform Create and Update operation.

3. Select a row to perform delete operation

## It has CI-CD Pipiline implementation which deploy the solution to SharePoint site collection app catalog

1. Once you push the changes to main branch, the workflow trigger and add the solution to app catalog
2. It uses site collection Admin username and password to authenticate to site and perform deployment using PnP PowerShell
