#include <stdio.h>
int main(){
	
	int y, R,x;
	
	scanf("%d",&x);
	
	while(x!=0){
		
		R = x%10;
		y = y*10 + R;
		x = x/10;
		
	}
	
	printf("%d", y);
}

