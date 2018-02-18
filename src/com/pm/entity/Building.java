package com.pm.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Building {
	private int building_id;
	private String building_name;
	private String room_num;
	private int status;
	
	public Building() {
		
	}

	public Building(int building_id, String building_name, String room_num,
			int status) {
		super();
		this.building_id = building_id;
		this.building_name = building_name;
		this.room_num = room_num;
		this.status = status;
	}

	@Id
	@GeneratedValue
	public int getBuilding_id() {
		return building_id;
	}

	public void setBuilding_id(int building_id) {
		this.building_id = building_id;
	}

	public String getBuilding_name() {
		return building_name;
	}

	public void setBuilding_name(String building_name) {
		this.building_name = building_name;
	}

	public String getRoom_num() {
		return room_num;
	}

	public void setRoom_num(String room_num) {
		this.room_num = room_num;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}
	
}
