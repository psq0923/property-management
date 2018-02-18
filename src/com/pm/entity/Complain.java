package com.pm.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Complain {
	
	private int id;//投诉表主键
	private int user_id;// 投诉人id
	private int admin_id;//被投诉人id（某一类的工作人员即管理员）
	private String content;//投诉原因
	private Date comp_time;//投诉时间
	private String back_info;//工作人员对所投诉的信息的反馈

	public Complain() {

	}
	
	@Id
	@GeneratedValue
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
	
	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	
	public Date getComp_time() {
		return comp_time;
	}

	public void setComp_time(Date comp_time) {
		this.comp_time = comp_time;
	}

	
	public String getBack_info() {
		return back_info;
	}

	public void setBack_info(String back_info) {
		this.back_info = back_info;
	}

	
	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	
	public int getAdmin_id() {
		return admin_id;
	}

	public void setAdmin_id(int admin_id) {
		this.admin_id = admin_id;
	}

}
