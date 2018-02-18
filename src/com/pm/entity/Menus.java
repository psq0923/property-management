package com.pm.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="menu")
public class Menus {
	private int menu_id;
	private String menu_name;
	private int admin_id;
	
	public Menus(){
		
	}
	
	public Menus(int menu_id, String menu_name, int admin_id) {
		super();
		this.menu_id = menu_id;
		this.menu_name = menu_name;
		this.admin_id = admin_id;
	}

	@Id
	@GeneratedValue
	public int getMenu_id() {
		return menu_id;
	}
	public void setMenu_id(int menu_id) {
		this.menu_id = menu_id;
	}
	public String getMenu_name() {
		return menu_name;
	}
	public void setMenu_name(String menu_name) {
		this.menu_name = menu_name;
	}
	public int getAdmin_id() {
		return admin_id;
	}
	public void setAdmin_id(int admin_id) {
		this.admin_id = admin_id;
	}
	
	
}
