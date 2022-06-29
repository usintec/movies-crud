# MODEL

## USER
    - email
    - password

## ROLE
    - name

## Movie
    - id;
    - synopsis;
    - title;
    - yearOfRelease;
    - language;
    - movieType;
    - featuredImage;

    

## MovieyType
    +---------------+--------------+------+-----+---------+----------------+
    | Field         | Type         | Null | Key | Default | Extra          |
    +---------------+--------------+------+-----+---------+----------------+
    | id            | int          | NO   | PRI | NULL    | auto_increment |
    | synopsis      | text         | YES  |     | NULL    |                |
    | title         | varchar(255) | NO   |     | NULL    |                |
    | yearOfRelease | varchar(255) | YES  |     | NULL    |                |
    | language      | varchar(255) | YES  |     | NULL    |                |
    | movieType     | int          | NO   |     | NULL    |                |
    | featureImage  | varchar(255) | NO   |     | NULL    |                |
    | createdAt     | datetime     | NO   |     | NULL    |                |
    | updatedAt     | datetime     | NO   |     | NULL    |                |
    +---------------+--------------+------+-----+---------+----------------+
    9 rows in set (0.00 sec)

## UserMovie
    - userId
    - MovieId
