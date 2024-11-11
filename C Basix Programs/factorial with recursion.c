
int fact(int i){
	
	if(i==0)
	return 0;
	if(i==1)
	return 1;

	else
	return i*fact(i-1);
	return i;
}

int main(){
	
	int f;
	
	f = fact(6);
	printf("%d",f);
	
	return 0;
}