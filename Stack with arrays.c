#include <stdio.h>

void push(int arr[], int stackTop ){
	int s;
	stackTop=stackTop+1;
	printf("enter the element ");
	scanf("%d",&s);
	arr[stackTop]=s;
	printf("added element is %d",arr[stackTop]);
	
}

void pop(int arr[], int stackTop)
{
	stackTop=stackTop-1;

}


void display(arr[], int stackTop){
	
	for(int i=0;i<stackTop;i++){
		printf("%d",arr[i]);
		
	}
}

int main(){

	int size= 0;
	
	arr[0];
	

//	printf("enter the size of stack ");
//	scanf("%d",&size);
	
	int stack[size];
	int stackTop = size-1;
	
	push(stack,stackTop);
	
	display(stack,stackTop);
	
	
	return 0;
}