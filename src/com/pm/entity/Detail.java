package com.pm.entity;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Detail {
	private int id;
	private int server_id;
	private int goods_id;
	private int number;
	@Id
	@GeneratedValue
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getServer_id() {
		return server_id;
	}
	public void setServer_id(int server_id) {
		this.server_id = server_id;
	}
	public int getGoods_id() {
		return goods_id;
	}
	public void setGoods_id(int goods_id) {
		this.goods_id = goods_id;
	}
	public int getNumber() {
		return number;
	}
	public void setNumber(int number) {
		this.number = number;
	}
	public Detail() {
	}
	public Detail(int id, int server_id, int goods_id, int number) {
		super();
		this.id = id;
		this.server_id = server_id;
		this.goods_id = goods_id;
		this.number = number;
	}
	
	

}
