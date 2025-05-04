#!/bin/bash

# Troubleshoot Argo CD login issues in Minikube
NAMESPACE="argocd"
echo "Troubleshooting Argo CD login issues in namespace: $NAMESPACE (Minikube)"

# Check prerequisites
if ! command -v kubectl &> /dev/null; then
    echo "Error: kubectl is not installed. Please install it."
    exit 1
fi
if ! command -v minikube &> /dev/null; then
    echo "Error: minikube is not installed. Please install it."
    exit 1
fi

# Check Minikube status
echo "Checking Minikube status..."
minikube status || {
    echo "Error: Minikube is not running. Start it with: minikube start"
    exit 1
}
MINIKUBE_IP=$(minikube ip)
echo "Minikube IP: $MINIKUBE_IP"

# Check Argo CD pods
echo "Checking Argo CD pods..."
kubectl get pods -n $NAMESPACE | grep argocd || {
    echo "Error: No Argo CD pods found in namespace $NAMESPACE. Verify installation."
    exit 1
}

# Check argocd-server pod status
SERVER_POD=$(kubectl get pods -n $NAMESPACE -l app.kubernetes.io/name=argocd-server -o name)
if [ -z "$SERVER_POD" ]; then
    echo "Error: argocd-server pod not found. Check Argo CD installation."
    exit 1
fi
kubectl describe pod -n $NAMESPACE $SERVER_POD | grep -i error && {
    echo "Error: Issues detected in argocd-server pod. Check logs with:"
    echo "kubectl logs -n $NAMESPACE $SERVER_POD"
}

# Verify admin password
echo "Retrieving admin password..."
PASSWORD=$(kubectl -n $NAMESPACE get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d 2>/dev/null)
if [ -z "$PASSWORD" ]; then
    echo "Warning: Could not retrieve admin password. Secret argocd-initial-admin-secret may be missing."
    echo "Check secrets with: kubectl get secret -n $NAMESPACE argocd-initial-admin-secret"
else
    echo "Admin password: $PASSWORD"
fi

# Check argocd-server service
echo "Checking argocd-server service..."
SERVICE_TYPE=$(kubectl get svc argocd-server -n $NAMESPACE -o jsonpath="{.spec.type}")
NODE_PORT=$(kubectl get svc argocd-server -n $NAMESPACE -o jsonpath="{.spec.ports[?(@.port==443)].nodePort}" 2>/dev/null)
if [ "$SERVICE_TYPE" == "NodePort" ] && [ -n "$NODE_PORT" ]; then
    echo "API server exposed via NodePort at: https://$MINIKUBE_IP:$NODE_PORT"
else
    echo "API server not exposed. Setting up port-forwarding..."
    kubectl port-forward svc/argocd-server -n $NAMESPACE 8080:443 &
    PORT_FORWARD_PID=$!
    echo "Port-forwarding enabled. Access UI at: https://localhost:8080"
fi

# Check argocd-cm for URL
echo "Checking argocd-cm ConfigMap..."
URL=$(kubectl get configmap argocd-cm -n $NAMESPACE -o jsonpath="{.data.url}" 2>/dev/null)
if [ -z "$URL" ]; then
    echo "Warning: No URL set in argocd-cm. Set it to: https://$MINIKUBE_IP:$NODE_PORT"
    echo "Edit with: kubectl edit configmap argocd-cm -n $NAMESPACE"
else
    echo "Argo CD URL: $URL"
fi

# Recommendations
echo -e "\nNext Steps:"
echo "1. Log in via CLI: argocd login localhost:8080 --username admin --password $PASSWORD --insecure"
echo "2. Access UI at: https://localhost:8080 (username: admin, password: $PASSWORD)"
echo "3. Check server logs: kubectl logs -n $NAMESPACE $SERVER_POD"
echo "4. If using NodePort, try: https://$MINIKUBE_IP:$NODE_PORT"
echo "5. Ensure Minikube tunnel is running: minikube tunnel"
echo "6. Verify RBAC: kubectl get configmap argocd-rbac-cm -n $NAMESPACE -o yaml"

# Clean up port-forwarding
if [ -n "$PORT_FORWARD_PID" ]; then
    echo "Press Ctrl+C to stop port-forwarding when done."
    wait $PORT_FORWARD_PID
fi
