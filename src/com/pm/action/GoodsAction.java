package com.pm.action;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;
import com.pm.entity.Goods;
import com.pm.entity.Page;
import com.pm.service.GoodsService;


public class GoodsAction extends ActionSupport {

	private Goods good;
	private int id;
	private List<Goods> goods;
 	private GoodsService goo;
    
	public Goods getGood() {
		return good;
	}
	public void setGood(Goods good) {
		this.good = good;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public List<Goods> getGoods() {
		return goods;
	}
	public void setGoods(List<Goods> goods) {
		this.goods = goods;
	}
	public GoodsService getGoo() {
		return goo;
	}
	public void setGoo(GoodsService goo) {
		this.goo = goo;
	}
	public String  execute() throws Exception {
		System.out.println("添加成功！");
		goo.saveGoods(good);
		goods = goo.findAllGoods2();
		return SUCCESS;
		
	}
	public String deleteGoods() throws Exception{
		good = goo.findByIdGoods(id);
		goo.deleteGoods(good);
		goods = goo.findAllGoods2();
		return SUCCESS;
	}
	public String updateGoods() throws Exception{
		Goods g = new Goods();
		System.out.println(good.toString());
		System.out.println("zch");
		g = goo.findByIdGoods(good.getGoods_id());
		g.setGoods_name(good.getGoods_name());
		g.setStorage(good.getStorage());
		g.setPrice(good.getPrice());
		goo.updateGoods(g);
		goods = goo.findAllGoods2();
		return SUCCESS;
		
	}
	public String findByIdGoods() throws Exception{
		good = goo.findByIdGoods(id);
		if(good==null)
			return ERROR;
		
		
		
		return SUCCESS;
		
	}
	public String findAllGoods() throws Exception {
		goods = goo.findAllGoods();
		if(goods==null)
			return ERROR;
		return SUCCESS;
	}
	public String findAllGoods2() throws Exception {
		goods = goo.findAllGoods2();
		if(goods==null)
			return ERROR;
		return SUCCESS;
	}
	
	
	public String updateGoodsgouwu() throws Exception{
		Goods g = new Goods();
		
		g = goo.findByIdGoods(good.getGoods_id());
		g.setGoods_name(good.getGoods_name());
		g.setStorage(good.getStorage()+g.getStorage());
		g.setPrice(good.getPrice());
		goo.updateGoods(g);
		goods = goo.findAllGoods2();
		return SUCCESS;
		
	}
	
}
