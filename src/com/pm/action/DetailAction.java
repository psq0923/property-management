package com.pm.action;

import java.util.List;

import com.opensymphony.xwork2.ActionSupport;
import com.pm.entity.Detail;
import com.pm.entity.Goods;
import com.pm.entity.Server_type;
import com.pm.service.DetailService;
import com.pm.service.GoodsService;
import com.pm.service.Server_typeService;

public class DetailAction extends ActionSupport{
	private static final long serialVersionUID = 1L;
  private Detail detail;
  private List<Detail> details;
  private DetailService detailService;
  private GoodsService goo;
  private Server_type server_t;
  private Goods goods;
  private List<Goods> goodss;
  private Server_typeService server_typeService;
  private List<Server_type> server_ts;
  
  public Server_typeService getServer_typeService() {
	return server_typeService;
}
public void setServer_typeService(Server_typeService server_typeService) {
	this.server_typeService = server_typeService;
}
public List<Server_type> getServer_ts() {
	return server_ts;
}




public GoodsService getGoo() {
	return goo;
}
public void setGoo(GoodsService goo) {
	this.goo = goo;
}
public Server_type getServer_t() {
	return server_t;
}
public void setServer_t(Server_type server_t) {
	this.server_t = server_t;
}

public void setServer_ts(List<Server_type> server_ts) {
	this.server_ts = server_ts;
}
public Goods getGoods() {
	return goods;
}
public void setGoods(Goods goods) {
	this.goods = goods;
}
public List<Goods> getGoodss() {
	return goodss;
}
public void setGoodss(List<Goods> goodss) {
	this.goodss = goodss;
}


  public Detail getDetail() {
		return detail;
	}
	public void setDetail(Detail detail) {
		this.detail = detail;
	}
	public List<Detail> getDetails() {
		return details;
	}
	public void setDetails(List<Detail> details) {
		this.details = details;
	}
	public DetailService getDetailService() {
		return detailService;
	}
	public void setDetailService(DetailService detailService) {
		this.detailService = detailService;
	}
	public String execute() throws Exception {
	    System.out.print("success");
		return SUCCESS;
	}
	
	public String findAllDetail() throws Exception{
		
		System.out.println("action");
		server_ts = server_typeService.findAllServer_type();
		goodss = goo.findAllGoods2();
		details = detailService.findAllDetails();
		System.out.println(details);
		if(details == null){
			return ERROR;
		}
		return SUCCESS;
	}

}
