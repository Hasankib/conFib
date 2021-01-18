FROM golang:1.12 as builder

# Set Environment Variables
ENV HOME /backend
ENV CGO_ENABLED 0
ENV GOOS linux

WORKDIR /backend
COPY go.mod go.sum ./
RUN go mod download
COPY . .

# Build app
RUN go build main.go fibonacci.go

FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /backend/

# Copy the pre-built binary file from the previous stage
COPY --from=builder /backend/main .

CMD [ "./main" ]