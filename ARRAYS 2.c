#include <stdio.h>

//Smallest largest number in an array
void arLargest(){
	
int ar[10]={1,2,3,4,5,6,7,8,9};
	
	int smallest = 0;
	int largest = 0;
	int i;
	for(i=1;i<0;i++){
		if(ar[i]<smallest){
			smallest = ar[i];
		
		if(ar[i]>largest){
			largest = ar[i];
		}
	}
	printf("%d",smallest);
}	
}

//list of elements with their index on top
void indexlist(){
	int i;
	int ar[10]={1,2,3,4,5,6,7,8,9};
	
	for(i=0;i<10;i++){
	if (i<10){
	
	printf("%d",ar[i]);
	
	}
}
printf("\n");
	for(i=0;i<10;i++){
	
	printf("%d",i);	
	}
}

//seeing values in array based on logics
void valueinArray(){
	int i;
	int ar[10]={1,2,3,4,5,6,7,8,9};
	
	for (i=0;i<10;i++){
		if (i%2==0){
		printf("%d",ar[i]);	
		}	
		}
}


void main(){	

	//arLargest();
	//indexlist();
	valueinArray();

	int i;
	char ar[5]={idrees, mustanser, adfar, shahid, umaid};
	
	
}

