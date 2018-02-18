package com.pm.action;

import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.RequestAware;

import com.opensymphony.xwork2.ActionSupport;
import com.pm.entity.AdminUser;
import com.pm.entity.News;
import com.pm.entity.Page;
import com.pm.service.AdminUserService;
import com.pm.service.NewsService;

public class NewsAction extends ActionSupport implements RequestAware {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private News news;
	private NewsService newsService;
	private List<News> newss;
	private int id;
	private int page; //第几页
    private Page pageBean;
    private AdminUserService auss;
    private List<AdminUser> aus;
    private Map<String, Object> request;

	public List<AdminUser> getAus() {
		return aus;
	}
	public void setAus(List<AdminUser> aus) {
		this.aus = aus;
	}
	public AdminUserService getAuss() {
		return auss;
	}
	public void setAuss(AdminUserService auss) {
		this.auss = auss;
	}
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public Page getPageBean() {
		return pageBean;
	}
	public void setPageBean(Page pageBean) {
		this.pageBean = pageBean;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public List<News> getNewss() {
		return newss;
	}
	public void setNewss(List<News> newss) {
		this.newss = newss;
	}
	public News getNews() {
		return news;
	}
	public void setNews(News news) {
		this.news = news;
	}
	public NewsService getNewsService() {
		return newsService;
	}
	public void setNewsService(NewsService newsService) {
		this.newsService = newsService;
	}
	
	public String findPageList() {
		aus = auss.findAllAdminUsers();
        pageBean = newsService.queryForPage(8, page,"");
        HttpSession session = ServletActionContext. getRequest().getSession();
        session.setAttribute("pageSize", pageBean.getPageSize());
        session.setAttribute("currentPage", pageBean.getCurrentPage());
        return "newsList";
    }
	
	/*public  List   findBymonth(String  entity_name) throws ParseException{
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        --------------------------------------------------------
    	设定日期格式
        SimpleDateFormat format=new SimpleDateFormat("yyyy-MM-dd");
        //获取笨本月第一天
         Calendar  calendar= Calendar.getInstance();
         int  current_month=calendar.get(Calendar.MONTH)+1;
         int  current_year=calendar.get(Calendar.YEAR);
         String  fir_str="'"+current_year+"-"+current_month+"-01'";
         System.out.println(""+current_year+"-"+current_month+"-01");
         Date firstDayOfMonth=format.parse(""+current_year+"-"+current_month+"-01");
         System.out.println("本月第一天："+firstDayOfMonth);
         //下个月第一天
         int   next_month=current_month+1;
         String last_str="'"+current_year+"-"+next_month+"-01'";
         System.out.println(""+current_year+"-"+current_month+"-01");
         Date lastDayOfMonth=format.parse(""+current_year+"-"+next_month+"-01");
         System.out.println("下一个月第一天："+lastDayOfMonth);
         --------------------------------------------
        
           String sql ="from "+entity_name+"  where date >"+fir_str+" and date<"+last_str+"";
        	Query query=session.createQuery(sql);
           List   list=query.list();
           return list;
    	
    }*/

	
	public String saveNews() throws ParseException{
		Date time= new java.sql.Date(new java.util.Date().getTime());
		/*SimpleDateFormat format=new SimpleDateFormat("yyyy-MM-dd");
		Calendar cal = Calendar.getInstance();
        int day = cal.get(Calendar.DATE);       //日
        int month = cal.get(Calendar.MONTH) + 1;//月
        int year = cal.get(Calendar.YEAR);		//年
        Date date=format.parse(""+year+"-"+month+"-01"+"-"+day);
        System.out.println("日期："+date);*/
		System.out.println("标题："+news.getTitle());
		System.out.println("内容："+news.getContent());
		news.setTitle(news.getTitle());
		news.setContent(news.getContent());
		news.setPublish_time(time);
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session1 = request.getSession();
		news.setAdmin_id((Integer)session1.getAttribute("admin_id"));
		newsService.saveNews(news);
		pageBean = newsService.queryForPage(8, page,"");
		return SUCCESS;
	}
	
	public String deleteNews(){
		aus = auss.findAllAdminUsers();
		news = newsService.findNewsById(id);
		newsService.deleteNews(news);
		pageBean = newsService.queryForPage(8, page,"");
		return SUCCESS;
	}
	
	public String updateNews() throws Exception{
		News n = new News();
		aus = auss.findAllAdminUsers();
		Date time= new java.sql.Date(new java.util.Date().getTime());
		n = newsService.findNewsById(news.getId());
		System.out.println(news.getId());
		System.out.println("标题"+news.getTitle());
		System.out.println("内容"+news.getContent());
		n.setTitle(news.getTitle());
		n.setContent(news.getContent());
		n.setPublish_time(time);
		System.out.println("--------------"+news.getIs_show());
		n.setIs_show(news.getIs_show());
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session1 = request.getSession();
		n.setAdmin_id((Integer)session1.getAttribute("admin_id"));
		newsService.updateNew(n);
		pageBean = newsService.queryForPage(8, page,"");
		return SUCCESS;
	}
	
	public String findAllNews() throws Exception{
		newss = newsService.findAllNews();
		//this.pageBean = newsService.queryForPage(6, page);
		if(newss==null){
			return ERROR;
		}
		return SUCCESS;
	}
	
	public String findByNewsId() throws Exception{
		news = newsService.findNewsById(id);
		if(news==null){
			return ERROR;
		}
		return SUCCESS;
	}
	
	public String findNewsByName() throws Exception{
		aus = auss.findAllAdminUsers();
		pageBean = newsService.queryForPage(8, page,news.getTitle());
		if(pageBean == null){
			return ERROR;
		}
		return SUCCESS;
	}

	@Override
	public void setRequest(Map<String, Object> arg0) {
		this.request = arg0;
	}
	
	public String list() {

		newss = newsService.findAllNews();
		request.put("newslist", newss);

		return "list";
	}
	
}
