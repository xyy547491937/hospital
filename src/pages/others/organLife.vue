<template>
    <div >
		<div class="father">
			<div class="child">
				
			</div>
			
		</div>
    </div>
</template>

<script>
    export default {

        data() {
			return{
			data:{}	
				
				
			}
        },

        mounted() {
			this.ceshi();
			this.ceshi1();
			
        },
        methods: {
			cds(){
// 				var myselect=document.getElementById("select");
// 				var index=myselect.selectedIndex ;
// 				myselect.options[index].value;
// 				console.log(myselect.options[index].value;)
// 				$.ajax(
// 				{ url:"http://baidu.com",
// 				type:"post",
// 				data:this.data,
// 				cache:true,
// 				headers:{},
// 				beforeSend：function(){},
// 					success:function(){},
// 					error:function(){},
// 					complete:function(){}				 
// 								
// 					
// 					
// 				}
				
				
				// )
			},
			// 判断一个字符串中出现次数最多的字符，统计这个次数
			ceshi(){
				var str = 'asdfssaaasasasasaa';
				var json={}
				let arr=str.split('')
				
				for(let i=0 ;i<arr.length;i++){
					let index =0
						for(let  j=0;j<arr.length;j++){
							if(arr[i]==arr[j]){
								index ++
							}
						}
					json[arr[i]]=index
					
					
				}
				console.log(JSON.stringify(json))
				
			},
			// 编写一个方法 去掉一个数组的重复元素？
			ceshi1(){
				var arr = [0,2,3,4,4,0,2];
				let arr3=[]
				for(var i = 0;i< arr.length;i++){
						arr3.indexOf(arr[i])
}				
				console.log(JSON.stringify(arr3))
			}
			
        },

    };
</script>

<style scoped>
.father{
	position: relative;
	height: 5rem;
	width:5rem;
	border:solid #000000 1px;
}
.child{
	position: absolute;
	border:solid #000000 1px;
	height: 1rem;
	width:1rem;
	 top: 0;
    bottom: 0;
    left: 0;
    right: 0;
	margin:auto;
	
	
	
}
.a{
	position: absolute;
	
}
</style>
