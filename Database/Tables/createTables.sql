--create user table
CREATE TABLE tbl_user(
user_id VARCHAR(300) PRIMARY KEY,
username VARCHAR(300) DEFAULT 'no username',
email VARCHAR(300) DEFAULT 'no email',
tagname VARCHAR(300) DEFAULT 'no tagname',
password VARCHAR(300) DEFAULT 'no password',
location VARCHAR(300) DEFAULT 'no location',
isEMailSent INT DEFAULT 0
);

---create a post table
CREATE TABLE post(
post_id  VARCHAR(300) PRIMARY KEY,
user_id  VARCHAR(300) FOREIGN KEY REFERENCES tbl_user(user_id),
content VARCHAR(MAX) DEFAULT 'no content',
post_date DATETIME DEFAULT GETDATE(),
likes INT DEFAULT 0,
comments INT DEFAULT 0
);

---create a photo table 
CREATE TABLE photo(
photo_id VARCHAR(300) PRIMARY KEY,
user_id VARCHAR(300) FOREIGN KEY REFERENCES tbl_user(user_id),
photo_url VARCHAR(MAX) DEFAULT 'no photo',
post_id VARCHAR(300) FOREIGN KEY REFERENCES post(post_id),
isProfileImage INT DEFAULT 0,
uploaded_on DATETIME  DEFAULT GETDATE()
);

--create a comnment table 
CREATE TABLE comment(
comment_id VARCHAR(300) PRIMARY KEY,
post_id VARCHAR(300) FOREIGN KEY REFERENCES post(post_id),
user_id VARCHAR(300) FOREIGN KEY REFERENCES tbl_user(user_id),
comment_date DATETIME DEFAULT GETDATE(),
content VARCHAR(MAX) DEFAULT 'no comment',
);

--create a friendship table 
CREATE TABLE friendship (
    follower_id VARCHAR(300),
    following_id VARCHAR(300),
    PRIMARY KEY (follower_id, following_id),
    FOREIGN KEY (follower_id) REFERENCES tbl_user(user_id),
    FOREIGN KEY (following_id) REFERENCES tbl_user(user_id),
	friendship_date DATETIME DEFAULT GETDATE()
);

---create a group table 
CREATE TABLE tbl_group(
group_id VARCHAR(300) PRIMARY KEY,
group_name VARCHAR(300) DEFAULT 'no name',
group_description VARCHAR(300) DEFAULT 'no description',
created_on DATETIME DEFAULT GETDATE()
);

--create a group_member
CREATE TABLE group_member(
id VARCHAR (300) PRIMARY KEY,
group_id VARCHAR (300) FOREIGN KEY REFERENCES tbl_group(group_id),
member_id INT FOREIGN KEY REFERENCES tbl_user(user_id)
);
--create a tbl_event

CREATE TABLE tbl_event(
event_id VARCHAR(300) PRIMARY KEY,
event_name VARCHAR (300) DEFAULT 'no name',
event_description  VARCHAR(MAX) DEFAULT 'no description',
event_date DATETIME DEFAULT GETDATE(),
location VARCHAR (300) DEFAULT 'no location',
event_poster_url VARCHAR(MAX) DEFAULT  'no poster'
);

---create a tbl message
CREATE TABLE tbl_message(
message_id VARCHAR(300) PRIMARY KEY,
sender_id VARCHAR(300) FOREIGN KEY REFERENCES tbl_user(user_id),
receiver_id VARCHAR(300) FOREIGN KEY REFERENCES tbl_user(user_id),
message_date DATETIME DEFAULT GETDATE(),
content VARCHAR(MAX) DEFAULT 'no message body'
);
--create a event attendee
CREATE TABLE event_attendee(
id VARCHAR(300) PRIMARY KEY,
event_id VARCHAR (300) FOREIGN KEY REFERENCES tbl_event(event_id),
attendee_id VARCHAR (300) FOREIGN KEY REFERENCES tbl_user(user_id),
);

--create a group_member table
CREATE TABLE group_member(
id VARCHAR (300) PRIMARY KEY,
group_id VARCHAR (300) FOREIGN KEY REFERENCES tbl_group(group_id),
member_id VARCHAR(300) FOREIGN KEY REFERENCES tbl_user(user_id)
);

--create a notification table 
CREATE TABLE group_member (
    id VARCHAR (300) PRIMARY KEY,
    user_id VARCHAR(300) FOREIGN KEY REFERENCES tbl_user(user_id),
    post_id VARCHAR(300) FOREIGN KEY REFERENCES post(post_id)
    
)

---create a video table
CREATE TABLE video(
video_id VARCHAR(300) PRIMARY KEY,
video_description VARCHAR(MAX) DEFAULT 'no description',
video_url VARCHAR(),
uploaded_on DATETIME DEFAULT GETDATE(),
user_id VARCHAR(300) FOREIGN KEY REFERENCES tbl_user(user_id)
)