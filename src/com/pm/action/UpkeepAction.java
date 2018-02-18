package com.pm.action;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.opensymphony.xwork2.ActionSupport;
import com.pm.entity.Detail;
import com.pm.entity.Goods;
import com.pm.entity.GoodsServer;
import com.pm.entity.Server_type;
import com.pm.service.DetailService;
import com.pm.service.GoodsService;
import com.pm.service.Server_typeService;

public class UpkeepAction extends ActionSupport {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	
	private List<Detail> details;
	private List<GoodsServer> goses = new ArrayList<GoodsServer>();
	private List<Server_type> servers;
	private int id;
	private GoodsService goo;
	private Server_typeService server_typeService;
	private DetailService detailService;

	
	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public List<Detail> getDetails() {
		return details;
	}


	public void setDetails(List<Detail> details) {
		this.details = details;
	}


	public List<GoodsServer> getGoses() {
		return goses;
	}


	public void setGoses(List<GoodsServer> goses) {
		this.goses = goses;
	}


	public GoodsService getGoo() {
		return goo;
	}


	public void setGoo(GoodsService goo) {
		this.goo = goo;
	}



	public List<Server_type> getServers() {
		return servers;
	}


	public void setServers(List<Server_type> servers) {
		this.servers = servers;
	}


	


	public Server_typeService getServer_typeService() {
		return server_typeService;
	}


	public void setServer_typeService(Server_typeService server_typeService) {
		this.server_typeService = server_typeService;
	}


	public DetailService getDetailService() {
		return detailService;
	}


	public void setDetailService(DetailService detailService) {
		this.detailService = detailService;
	}


	public static long getSerialversionuid() {
		return serialVersionUID;
	}


	public String findAllUpkeep() throws Exception {
		details = detailService.findAllDetails();
		Iterator<Detail> detailsiter = details.iterator();
		
		while(detailsiter.hasNext())
		{
				Detail d = detailsiter.next();
				Goods g = goo.findByIdGoods(d.getGoods_id());
				Server_type s = server_typeService.findById(d.getServer_id());
				GoodsServer gs = new GoodsServer();
				gs.setServer_id(s.getServer_id());
				gs.setSer_type(s.getSer_type());
				//gs.setId(d.getId());
				gs.setNumber(d.getNumber());
				gs.setCharge_sta(s.getCharge_sta());
				gs.setCharge_type(s.getCharge_type());
				gs.setGoods_id(g.getGoods_id());
				gs.setGoods_name(g.getGoods_name());
				gs.setStorage(g.getStorage());
				gs.setPrice(g.getPrice());		
				goses.add(gs);			
			}
		return SUCCESS;
	}
	
	public String updateUpkeep() throws Exception {
		
		return SUCCESS;
		
	}

	/*
	 * a = que(aid); get(a.getBid()); b = que(bid); get(b.getCid()); c =
	 * que(cid); d.set(a); d.set(b); d.set(c);
	 */
}
