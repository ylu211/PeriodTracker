# PeriodTracker

## Use the Period Tracker app from local
### Launch frontend app

First, go to the frontend folder : 
```
cd front
```

Then, install node modules :
```
npm install
```

Then you can run the front app in the development mode :
```
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The front will work but it needs the backend and the database to full fonction


### Launch backend app

First, go to the backend folder : 
```
cd ..
cd backend
```

Then, install node modules :
```
npm install
```

Then you can run the backend app in the development mode :
```
npm run start:dev
```

You can access it on [http://localhost:3001](http://localhost:3001).

### Launch Mongo

Download MongoDB Compass on [https://www.mongodb.com/try/download/compass](https://www.mongodb.com/try/download/compass)

Launch the app and connect to `localhost:27017`

### Test the app on your browser

You can now fully test the Period Tracker app on [http://localhost:3000](http://localhost:3000) in your browser.

## Use Period Tracker app in Docker

### Launch backend app
Go on the back folder : 
```
cd backend
```
Use the Docker-Compose file :
```
docker compose up
```

### Launch front app
Go on the front folder : 
```
cd front
```
Create Docker image with :
```
docker build -t periodtracker-front .
```

To verify that this has worked, do : 
```
docker images
```

To run the app, do : 
```
docker run -p 3000:3000 -t periodtracker-front
```

### Test the app on your browser

You can now fully test the Period Tracker app on [http://localhost:3000](http://localhost:3000) in your browser.

## Use Period Tracker app in Kubernetes (Minikube) with Istio

Download minikube on [https://minikube.sigs.k8s.io/docs/start/](https://minikube.sigs.k8s.io/docs/start/)

Launch minikube with :
```
minikube start --cpus=2 --memory=5000 --driver=docker
```

Install Istio : 
https://istio.io/latest/docs/setup/getting-started/

Select a version and download it (we use the version 1.19).
Then in another command prompt, go to the istio folder and install it to minikube :
```
cd istio-1.19.0
cd bin    
istioctl install --set profile=demo -y
cd ..   
```
Enable auto-injection of the Istio side-cars when the pods are started:
```
kubectl label namespace default istio-injection=enabled
```
Install the Istio addons (Kiali, Prometheus, Jaeger, Grafana):
```
kubectl apply -f samples/addons
```

Enable auto-injection of the Istio side-cars when the pods are started:
```
kubectl label namespace default istio-injection=enabled
```

Configure Docker so that it uses the Kubernetes cluster:
```
minikube docker-env
eval $(minikube -p minikube docker-env)
eval $(minikube docker-env)  
```

On the root of the project, create all the deployments, services etc with :
```
kubectl apply -f front-back-db.yml
```

Verify that everything works with : 
````
kubectl get pods
```

Open project with istio : 
`````
kubectl -n istio-system port-forward deployment/istio-ingressgateway 30819:8080
```

Then go to your browser and access to the app via localhost:30819