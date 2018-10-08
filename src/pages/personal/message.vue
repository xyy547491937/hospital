<template>
	<div class="mine">
		<div class="messages">
		<i-cell-group i-class="mespage">
   <ul >
   	<li>
   		<div class="message-lf">
   			<img src="http://img.meiduduo.com/images/mine/message.png"/>
   		</div>
   		<div class="message-rh">
   			 <i-cell title="您有一个订单下单成功啦！" is-link url="/pages/personal/message">
    	<span id="" class="mes-data">
    		2018-01-01 12:02:39
    	</span>
    	
    </i-cell>
   		</div>
   	</li>
   	<li>
   		<div class="message-lf">
   			<img src="http://img.meiduduo.com/images/mine/message.png"/>
   		</div>
   		<div class="message-rh">
   			 <i-cell title="您有一个订单下单成功啦！" is-link url="/pages/personal/message">
    	<span id="" class="mes-data">
    		2018-01-01 12:02:39
    	</span>
    	
    </i-cell>
   		</div>
   	</li>
 
   </ul>
   
    
    
   
</i-cell-group>	
		</div>
		
	</div>
</template>

<script>
</script>

<style>
	.mespage ul li{
		position: relative;
	}
	.message-lf{
		position: absolute;
		top: 20%;
		left: 0.25rem;
	}
	.message-rh{
		margin-left: 0.8rem;
	}	
	.message-lf img{
		width: 0.5rem;
		height: 0.5rem;
		 vertical-align: middle
	}
	.mine {
		background-color: #fff;
	}
	
	.mespage{
		margin-top: 0.1rem;
	}
	.mes-data{
		font-size: 0.2rem;
		color: #999;
	}
</style>