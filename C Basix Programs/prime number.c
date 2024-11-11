#include <stdio.h>

void main(){
	int x,i,R;
	printf("Enter a number to check if it is PRIME:");
	scanf("%d",&x);
	
	for (i=0;i<=x/2;i++){
		
		R= x%i;
		
		if (R==0){
			printf("The number is COMPOSITE");}
		else {
			printf("The number is PRIME");}
		
//		if(printf("good")){
//		}
			
		}
		getch();
		}
