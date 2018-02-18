package com.pm.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="adminuser")
public class AdminUser {
	private int id;
	private String username;
	private String password;
	private int access_id;
	private String email;
	private int status;
	
	public AdminUser(){
		
	}
	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public AdminUser(int id, String username, String password, int access_id,
			String email, int status) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.access_id = access_id;
		this.email = email;
		this.status = status;
	}

	@Id
	@GeneratedValue
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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

	public int getAccess_id() {
		return access_id;
	}

	public void setAccess_id(int access_id) {
		this.access_id = access_id;
	}
	
}
