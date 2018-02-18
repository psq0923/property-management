package com.pm.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="adminaccess")
public class AdminAccess {
	
	private int access_id;
	private String access_name;

	public AdminAccess(){
		
	}

	public AdminAccess(int access_id, String access_name) {
		super();
		this.access_id = access_id;
		this.access_name = access_name;
	}

	@Id
	@GeneratedValue
	public int getAccess_id() {
		return access_id;
	}
	public void setAccess_id(int access_id) {
		this.access_id = access_id;
	}
	public String getAccess_name() {
		return access_name;
	}
	public void setAccess_name(String access_name) {
		this.access_name = access_name;
	}
	
}
