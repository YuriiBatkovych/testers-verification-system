USE `full-stack-ecommerce`;

INSERT into customer 
-- values (1, 'Anna', 'Test', 'anna.test@mail.com'); 
-- values (2, 'Yurii', 'Titov', 'tyv.ura1203@gmail.com'); 
values (3, 'Staff', 'Test', 'staff.test@mail.com');

INSERT into roles values
(1, 'ADMIN'),
(2, 'STAFF'),
(3, 'USER');

INSERT into customer_roles values
-- (2, 1);
(3, 2);