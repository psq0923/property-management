package com.pm.entity;

public class GoodsServer {
	private int server_id;//服务类型ID
	private String ser_type;//服务类型
	private String charge_type;//收费项目
	private String  charge_sta;//收费标准
	private int goods_id;
	private String goods_name;
	private int storage;
	private float price;
	private int id;
	private int number;
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
	public String getCharge_sta() {
		return charge_sta;
	}
	public void setCharge_sta(String charge_sta) {
		this.charge_sta = charge_sta;
	}
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
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getNumber() {
		return number;
	}
	public void setNumber(int number) {
		this.number = number;
	}
	public GoodsServer() {
	}
	public GoodsServer(int server_id, String ser_type, String charge_type,
			String charge_sta, int goods_id, String goods_name, int storage,
			float price, int id, int number) {
		super();
		this.server_id = server_id;
		this.ser_type = ser_type;
		this.charge_type = charge_type;
		this.charge_sta = charge_sta;
		this.goods_id = goods_id;
		this.goods_name = goods_name;
		this.storage = storage;
		this.price = price;
		this.id = id;
		this.number = number;
	}
		
}
