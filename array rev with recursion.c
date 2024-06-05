#include <stdio.h>


int reverse(int x,int arr[]){
	
	if(x==0)
	return 0;    
	                                                                             
	printf("%d" ,arr[x-1]);
	
	
	return reverse(x-1,arr);
}


int main(){
	
	int zee[5]={1,2,3,4,5};
	
	
	reverse(5,zee);
	
	
	
	return 0;
}