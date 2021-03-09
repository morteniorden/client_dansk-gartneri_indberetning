@startuml

class AuditableEntity {
  CreatedBy
  Created
  LastModifiedBy
  LastModified
}

interface IUser {
  Id
  Email
  Password
  Role
  Name
  DeactivationTime
}

class Account {
  Id
  Name
  Tel
  Email
  Address
  CVRNumber
  Users
  DeactivationTime
}

class User {
  AccountId
}

enum Role {
  Admin
  Accountant
  Client
}

class Address {
  StreetName
  StreetNumber
  PostCode
  City
  Country
}

User -|> IUser
User -|> AuditableEntity
Account -|> AuditableEntity
Account "1"-->"0..*" User
User "1"-->"1..2" Address

@enduml