



export default {
   measures:['person','amount','floatPl'],
   companies:['YG','SD','TD'],
   cmpnames:['金祥','盛鼎','金策'],
   msnames:['持仓人数','持仓金额','持仓盈亏'],
   pznames:['粤贵银','Ag(T+D)','Au(T+D)'],
   commodity:['AGT+D','AUT+D','GDAG'],
   sids:['PMEC.GDAG','SGE.AGT+D','SGE.AUT+D'] ,
   smallmeasure:['position','close'], 
   heads:{
        0:{
            name:'金额',
            value:'amount'
        },
        1:{
            name:'人数',
            value:'person'
        }},
   head:{
        0:[{
            name:'多单',
            index:0,
        }],
        1:[{
            name:'建仓',
            index:1,
            value:'openPrice'
        },{
            name:'/持仓价',
            index:2,
            value:'positionPrice'
        }],
        2:[{
            name:'空单',
            index:3
        }]
   },
   allLiDu:[{
      text:'1min',
      index:0,
      dimension:'m1',
      mode:0,
      value:1000*60,
      interval:60*1000,
      flg:[false,false,false,true],
      select:0,
    },{
      text:'5min',
      index:1,
      mode:0,
      dimension:'m5',
      value:1000*60*5,
      interval:60*1000,
      flg:[false,false,false,true],
      select:0,
    },{
      text:'30min',
      index:2,
      mode:0,
      dimension:'m30',
      value:1000*60*30,
      flg:[false,false,false,true],
      interval:60*1000,
      select:0,
    },{
      text:'1hour',
      index:3,
      mode:0,
      dimension:'hour',
      value:1000*3600,
      flg:[false,false,false,true],
      interval:60*1000,
      select:0,
    },{
      text:'日k',
      value:3600*1000*24*30,
      mode:1,
      dimension:'day',
      index:4,
      flg:[false,false,false,true],
      interval:60*1000,
      select:1,
      // cancelAdd:true
    }],  
    msgs: [ 
            '<div style="text-align:left;font-size:16px;">1、鼠标移至顶端可选择公司范围，移至底端可切换品种，移至左边缘可切换显示种类；<br>2、从上往下依次为多空比、行情K线、多空分布、净头寸；<br>3、粤贵银默认显示金祥+盛鼎数据，Ag/Au延期目前只抓取金策数据；<br>4、持仓人数按照交易账号非重复计数；<br> 5、多空比=多头持仓人数/空头持仓人数。</div>',
            '<div style="text-align:left;font-size:16px;">1、鼠标移至顶端可选择公司范围，移至底端可切换品种，移至左边缘可切换显示种类；<br>2、从上往下依次为多空比、行情K线、多空分布、净头寸；<br>3、粤贵银默认显示金祥+盛鼎数据，Ag/Au延期目前只抓取金策数据；<br>4、持仓金额为成交金额汇总；<br>5、多空比=多头持仓金额/空头持仓金额。</div>',
            '<div style="text-align:left;font-size:16px;">1、鼠标移至顶端可选择公司范围，移至底端可切换品种，移至左边缘可切换显示种类；<br>2、从上往下依次为持仓盈亏率（面积图）、离场盈亏率（散点图）、行情K线、多空分布、净头寸；<br>3、粤贵银默认显示金祥+盛鼎数据，Ag/Au延期目前只抓取金策数据；<br>4、持仓盈亏率=（现价-建仓价）*重量/建仓占用保证金；<br> 5、持仓盈率为（现价-建仓价）≥0的单子按照上述公式统计的结果，亏率反之；<br>6、现价按照建仓的买卖方向分别取对应的价格；'
+'<br> 7、离场盈亏率=（平仓盈亏-手续费）/建仓占用保证金；<br> 8、离场盈率为（平仓盈亏-手续费）≥0的单子按照上述公式统计的结果，亏率反之。<br>9、因实时推送持仓数据接口暂保留一年记录，会有部分平仓匹配不到建仓记录，因此离场盈亏率绝对值比真实值偏大，即盈率偏大，亏率偏小。</div>'
          ],
    comfilter:[{
        name:'YG',
        value:'YG',
        active:false,
        companies:[{
          name:'金祥',
          value:'YG',
          active:true
        },{
          name:'盛鼎',
          value:'SD',
          active:true
        }]
      },{
        name:'TD',
        active:false,
        companies:[{
          active:true,
          name:'金策',
          value:'TD'
        }]
    }], 
}

