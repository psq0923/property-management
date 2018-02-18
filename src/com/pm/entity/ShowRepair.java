package com.pm.entity;

import java.util.Date;

public class ShowRepair {
	private int id;
    private int user_id;
    private int goods_id;
    private Date repair_time;
	private String remark;
	private int status;
    private String goods_name;
	private String username;
	private String mobile;
	private int building_id;
	private int floor_num;
	private String room_num;
	
	
	public ShowRepair() {
		
	}
	public ShowRepair(int id, int user_id, int goods_id, Date repair_time,
			String remark, int status, String goods_name, String username,
			String mobile, String building_num, int floor_num, String room_num) {
		super();
		this.id = id;
		this.user_id = user_id;
		this.goods_id = goods_id;
		this.repair_time = repair_time;
		this.remark = remark;
		this.status = status;
		this.goods_name = goods_name;
		this.username = username;
		this.mobile = mobile;
		this.building_id = building_id;
		this.floor_num = floor_num;
		this.room_num = room_num;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public int getGoods_id() {
		return goods_id;
	}
	public void setGoods_id(int goods_id) {
		this.goods_id = goods_id;
	}
	public Date getRepair_time() {
		return repair_time;
	}
	public void setRepair_time(Date repair_time) {
		this.repair_time = repair_time;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getGoods_name() {
		return goods_name;
	}
	public void setGoods_name(String goods_name) {
		this.goods_name = goods_name;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public int getBuilding_id() {
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
	
}
