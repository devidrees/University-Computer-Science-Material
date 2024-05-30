# include <stdio.h>

int main(){

int sparse[4][4]={0,0,0,1,0,0,3,0,4,0,0,3,6,0,0,0};

int size=0;

for(int i=0;i<4;i++){
  for(int j=0;j,4;j++){
    print("%d",sparse[i][j]);

  if(sparse[i][j]!=0){
    size++;
    }

  }
  printf("\n");
}
getch();
return 0;

}
