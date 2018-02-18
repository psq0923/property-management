package com.pm.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class User {
	private int user_id;
	private String username;
	private String password;
	private int building_id;
	private int floor_num;
	private String room_num;
	private String mobile;
    private Date time;
    private int Status;
	public User() {
		
	}

	@Id
	@GeneratedValue
	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public  int getBuilding_id() {
		return building_id;
	}

	public void setBuilding_id(int building_id) {
		this.building_id = building_id;
	}

	public int getFloor_num() {
		return floor_num;
	}

	public void setFloor_num(int floor_num) {
		this.floor_num = floor_num;
	}

	public String getRoom_num() {
		return room_num;
	}

	public void setRoom_num(String room_num) {
		this.room_num = room_num;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public Date getTime() {
		return time;
	}

	public void setTime(Date time) {
		this.time = time;
	}

	public User(int user_id, String username, String password, int building_id,
			int floor_num, String room_num, String mobile, Date time, int status) {
		super();
		this.user_id = user_id;
		this.username = username;
		this.password = password;
		this.building_id = building_id;
		this.floor_num = floor_num;
		this.room_num = room_num;
		this.mobile = mobile;
		this.time = time;
		Status = status;
	}

	public int getStatus() {
		return Status;
	}

	public void setStatus(int status) {
		Status = status;
	}
	

}
