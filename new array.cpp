#include <stdio.h>

//Smallest largest number in an array
void arLargest(){
	
int ar[10]={1,2,3,4,5,6,7,8,9};
	
	int smallest = ar[0];
	int largest = ar[0];
	int i;
	for(i=1;i<10;i++){
		if(ar[i]<smallest){
			smallest = ar[i];
		
		if(ar[i]>largest){
			largest = ar[i];
		}
	}
	}
	printf("%d",smallest);	
}

int main(){	

	arLargest();
	
	return 0;
}
