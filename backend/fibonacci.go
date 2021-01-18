package main


import (
    "fmt"
)

var last int
var secondLast int
var safe [] int

func processZero(in [] chan int){
    println("0 0")
    safe = append(safe,0)
    safe = append(safe,0)
    in[0]<-0
    in[0]<-0
}

func processOne(in [] chan int){
    <-in[0]
    println("1 1")
    safe = append(safe,1)
    safe = append(safe,1)
    in[1]<- 1
    in[1]<- 1
}

func fib(in [] chan int,i int){
    last = <- in[i-1]
    secondLast = <- in[i-2]
    last += secondLast
    copy := last
    print(i)
    print(" ")
    println(last)
    safe = append(safe,i)
    safe = append(safe,last)
    fmt.Printf("%v", safe)
    in[i]<- last
    in[i]<- copy
    close(in[i])}
    


func Sane(x int) []int {
    safe = nil
    in := make([]chan int, x)
    for i := 0; i < x; i++ {in[i] = make(chan int)}
    go processZero(in);go processOne(in)
    for i := 2; i < x; i++ {go fib(in,i)}
    <- in[x-2]
    <- in[x-1]
    <- in[x-1]
    return safe
}
