#include <stdio.h>

int main(){

int sparse[4][4]={0,0,0,1,0,0,3,0,4,0,0,3,6,0,0,0};

int size=0;

for(int i=0;i<4;i++){
  for(int j=0;j<4;j++){
    
	printf("%d",sparse[i][j]);

  if(sparse[i][j]!=0){
    size++;
    }

  }
  printf("\n");
}
 int infomat[size][3];
 int k=0;
 for(int i=0;i<4;i++){
 	for(int j=0;j<4;j++){
	
 if(sparse[i][j]!=0){
 
 infomat[k][0]=i;
 infomat[k][1]=j;
 infomat[k][2]=sparse[i][j];
 k++;
 
}
}
}

printf("\n");
for(int i=0;i<size;i++){
  for(int j=0;j<3;j++){
    
	printf("%d",infomat[i][j]);

  

  }
  printf("\n");
}

}