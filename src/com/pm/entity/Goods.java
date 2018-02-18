package com.pm.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Goods { 
	private int goods_id;
	private String goods_name;
	private int storage;
	private float price;
	
	
	public Goods() {
		
	}
	public Goods(int goods_id, String goods_name, int storage, float price) {
		super();
		this.goods_id = goods_id;
		this.goods_name = goods_name;
		this.storage = storage;
		this.price = price;
	}
	@Id
	@GeneratedValue
	public int getGoods_id() {
		return goods_id;
	}
	public void setGoods_id(int goods_id) {
		this.goods_id = goods_id;
	}
	public String getGoods_name() {
		return goods_name;
	}
	public void setGoods_name(String goods_name) {
		this.goods_name = goods_name;
	}
	public int getStorage() {
		return storage;
	}
	public void setStorage(int storage) {
		this.storage = storage;
	}
	public float getPrice() {
		return price;
	}
	public void setPrice(float price) {
		this.price = price;
	}
}
