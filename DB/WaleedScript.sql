create table Clinic (
	VetId		INT 			not null,
    Address		varchar(100)	not null,
    Phone		INT				not null,
    Days		varchar(100),
    Hours		varchar(100),
    primary key(VetId)
    /*,foreign key(VetId)	references Vet(Id)*/
);

create table Pharmacy (
	Id			INT				not null,
    Address		varchar(100)	not null,
    Phone		INT				not null,
    Days		varchar(100),
    Hours		varchar(100),
    primary key(Id)
);

create table Review (
	OwnerId		INT				not null,
    VetId		INT				not null,
    Rating		INT				not null,
    primary key(VetId, OwnerId)
    /*,foreign key(VetId)	references Vet(Id)*/
    /*,foreign key(OwnerId)	references Owner(Id)*/
);

create table Medicines (
	PharmacyId		INT				not null,
    MedName			varchar(100)	not null,
    MedDescription	varchar(200)	not null,
    price			INT				not null,
    Quantity		INT						,
    primary key(PharmacyId, MedName),
    foreign key(PharmacyId) references Pharmacy(Id)
);