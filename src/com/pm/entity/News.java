package com.pm.entity;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class News {
	private int id;
	private String title;
	private String content;
	private Date publish_time;
	private int is_show;
	private int admin_id;
	
	public News(){
		
	}

	public News(int id, String title, String content, Date publish_time,
			int is_show, int admin_id) {
		super();
		this.id = id;
		this.title = title;
		this.content = content;
		this.publish_time = publish_time;
		this.is_show = is_show;
		this.admin_id = admin_id;
	}

	@Id
	@GeneratedValue
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Date getPublish_time() throws ParseException {
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
		return sf.parse(String.valueOf(publish_time));
	}

	public void setPublish_time(Date publish_time) {
		this.publish_time = publish_time;
	}

	public int getIs_show() {
		return is_show;
	}

	public void setIs_show(int is_show) {
		this.is_show = is_show;
	}

	public int getAdmin_id() {
		return admin_id;
	}

	public void setAdmin_id(int admin_id) {
		this.admin_id = admin_id;
	}

}
