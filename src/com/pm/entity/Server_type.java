package com.pm.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Server_type {
	
	private int server_id;//服务类型ID 主键
	private String ser_type;//服务类型
	private String charge_type;//收费项目
	private String  charge_sta;//收费标准
	
	public String getCharge_sta() {
		return charge_sta;
	}
	public void setCharge_sta(String charge_sta) {
		this.charge_sta = charge_sta;
	}
	/*@Override
	public String toString() {
		return "Server_type [server_id=" + server_id + ", ser_type=" + ser_type
				+ ", charge_type=" + charge_type + ", charge_sta=" + charge_sta
				+ "]";
	}*/
	@Id
	@GeneratedValue
	public int getServer_id() {
		return server_id;
	}
	public void setServer_id(int server_id) {
		this.server_id = server_id;
	}
	public String getSer_type() {
		return ser_type;
	}
	public void setSer_type(String ser_type) {
		this.ser_type = ser_type;
	}
	public String getCharge_type() {
		return charge_type;
	}
	public void setCharge_type(String charge_type) {
		this.charge_type = charge_type;
	}
/*	public float getCharge_sta() {
		return charge_sta;
	}
	public void setCharge_sta(float charge_sta) {
		this.charge_sta = charge_sta;
	}*/
	
	public Server_type() {
		// TODO Auto-generated constructor stub
	}
	public Server_type(int server_id, String ser_type, String charge_type,String charge_sta) {
	
		this.server_id = server_id;
		this.ser_type = ser_type;
		this.charge_type = charge_type;
		this.charge_sta = charge_sta;
	}
	/*@Id
	@GeneratedValue
	public int getUid() {
		return uid;
	}
	public void setUid(int uid) {
		this.uid = uid;
	}
	public String getUname() {
		return uname;
	}
	public void setUname(String uname) {
		this.uname = uname;
	}
	public String getUpass() {
		return upass;
	}
	public void setUpass(String upass) {
		this.upass = upass;
	}

*/
}
