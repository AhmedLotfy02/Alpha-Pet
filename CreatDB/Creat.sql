use alpha_pet;
create table Pharmacy (
	Id			INT				not null,
    Address		varchar(100)	not null,
    Phone		INT				not null,
    StartDay			varchar(100),
    EndDay				varchar(100),
    StartHour			varchar(100),
    EndHour				varchar(100),
    primary key(Id)
);

create table Vet (
	Email varchar(50) not null,
    FName varchar(50) not null,
    LName varchar(50) not null,
    Charge float4,
    state bool,
    primary key(Email)    
);

create table Owner_Table (
	Email varchar(50) not null,
    FName varchar(50) not null,
    LName varchar(50) not null,
    Phone varchar(11) not null,
    Balance float4,
    Favourite_Vet_Email varchar(50),
    City varchar(50) not null,
    
    primary key (Email),
    foreign key (Favourite_Vet_Email) references Vet(Email)
		on delete set null
        on update set null
);

create table Pet(
	ownerEmail varchar(50) not null,
    petName varchar(50) not null,
    color varchar(50) not null,
    age int not null,
    primary key(ownerEmail),
    foreign key(ownerEmail) references Owner_Table(Email)
		on delete cascade
        on update cascade
);

create table Clinic (
	VetEmail		varchar(50) 			not null,
    Address			varchar(100)			not null,
    Phone			INT						not null,
    StartDay			varchar(100),
    EndDay				varchar(100),
    StartHour			varchar(100),
    EndHour				varchar(100),
	primary key(VetEmail),
	foreign key(VetEmail)	references Vet(Email)
		on delete cascade
        on update cascade
);



create table Review (
	OwnerEmail		varchar(50)				not null,
    VetEmail		varchar(50)				not null,
    Rating			INT				not null,
    primary key(OwnerEmail, VetEmail),
    foreign key(VetEmail)	references Vet(Email)
		on delete cascade
		on update cascade,
    
    foreign key(OwnerEmail)	references Owner_Table(Email)
		on delete cascade
        on update cascade
);


create table Medicines (
	MedicineId		INT				not null,
    MedName			varchar(100)	not null,
    MedDescription	varchar(200)	not null,
    price			INT				not null,
    
    primary key(MedicineId)
    
);


create table Medcine_Pharmacy (
	PharmacyId		INT				not null,
    MedicineId		INT				not null,
    Quantity		INT						,
    
    primary key(PharmacyId, MedicineId),
    foreign key(MedicineId) references Medicines(MedicineId)
		on delete cascade
        on update cascade,
    foreign key(PharmacyId) references Pharmacy(Id)
		on update cascade
        on delete cascade
);


CREATE TABLE Degree
(
	DegreeYear int,
	College varchar(50),
	DegreeName varchar(500),
	VetEmail varchar(50) not null,
	primary key(DegreeYear, College, DegreeName, VetEmail),
	Foreign key (VetID) references Vet(vetEmail)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE Pharmacist
(
	Email varchar(50) not null,
	primary key(Email),
	FName varchar(50),
	LName varchar(50),
    Pharmacy_Id int,
    foreign key (Pharmacy_Id) references Pharmacy(ID)
		on delete set null
        on update cascade
);

CREATE TABLE Appointment
(
	StartDate date,
	EndDate date,
	OwnerEmail varchar(50) not null,
	VetEmail varchar(50) not null,
	primary key(StartDate, OwnerEmail),
	Foreign key (VetEmail) references Vet(Email)
	ON UPDATE CASCADE
	ON DELETE CASCADE,
	Foreign key (OwnerEmail) references Owner_Table(Email)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE Invoice
(
	Notes varchar(500),
	RequiredMedicines varchar(100),
	PharmacyID int not null,
	VetEmail varchar(50) not null,
	Foreign key (VetEmail) references Vet(Email)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	Foreign key (PharmacyID) references Pharmacy(Id)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

create Table Vet_Post(
	P_Id int auto_increment not null,
    Post_Content varchar(10000) not null,
    vetEmail varchar(50) not null,
    primary key(P_Id),
    foreign key(vetEmail) references Vet(Email)
		on update cascade
        on delete cascade
);

create Table Pharmacist_Post(
	P_Id int auto_increment not null,
    Post_Content varchar(10000) not null,
    PharmacistEmail varchar(50) not null,
    primary key(P_Id),
    foreign key(PharmacistEmail) references Pharmacist(Email)
		on update cascade
        on delete cascade
);

create Table Owner_Post(
	P_Id int auto_increment not null,
    Post_Content varchar(10000) not null,
    OwnerEmail varchar(50) not null,
    primary key(P_Id),
    foreign key(OwnerEmail) references Owner_Table(Email)
		on update cascade
        on delete cascade
);

create Table Vet_Comment(
	C_Id int auto_increment not null,
    Comment_Content varchar(10000) not null,
    vetEmail varchar(50) not null,
    primary key(C_Id),
    foreign key(vetEmail) references Vet(Email)
		on update cascade
        on delete cascade
);

create Table Pharmacist_Comment(
	C_Id int auto_increment not null,
    Comment_Content varchar(10000) not null,
    PharmacistEmail varchar(50) not null,
    primary key(C_Id),
    foreign key(PharmacistEmail) references Pharmacist(Email)
		on update cascade
        on delete cascade
);
create Table Owner_Comment(
	C_Id int auto_increment not null,
    Comment_Content varchar(10000) not null,
    OwnerEmail varchar(50) not null,
    primary key(C_Id),
    foreign key(OwnerEmail) references Owner_Table(Email)
		on update cascade
        on delete cascade
);

create table History_Table (
	vetEmail varchar(50) not null,
    Appointment_Date Timestamp not null,
    primary key(vetEmail, Appointment_Date),
    foreign key (vetEmail) references Vet(Email)
		on update cascade
        on delete cascade
); 






