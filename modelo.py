from sklearn.linear_model import LinearRegression
training_data = [[3000, 20, 0.08, 10],
  [2500, 15, 0.05, 12],
  [2000, 10, 0.03, 15],
  [1500, 8, 0.02, 18],
  [1000, 6, 0.01, 20],
  [3000, 25, 0.1, 10],
  [2500, 20, 0.07, 12],
  [2000, 15, 0.04, 15],
  [1500, 12, 0.03, 18],
  [1000, 10, 0.02, 20],
  [3000, 30, 0.12, 10],
  [2500, 25, 0.09, 12],
  [2000, 20, 0.06, 15],
  [1500, 16, 0.04, 18],
  [1000, 12, 0.03, 20],
  [3000, 35, 0.14, 10],
  [2500, 30, 0.1, 12],
  [2000, 25, 0.07, 15],
  [1500, 20, 0.05, 18],
  [1000, 15, 0.04, 20],
  [3000, 20, 0.08, 18],
  [2500, 25, 0.06, 20],
  [2000, 22, 0.05, 15],
  [1500, 18, 0.04, 12],
  [1000, 15, 0.03, 10],
  [2000, 10, 0.05, 12],
  [1500, 15, 0.03, 15],
  [1000, 12, 0.02, 10],
  [2500, 8, 0.04, 18],
  [1800, 20, 0.03, 14],
  [1200, 16, 0.02, 11],
  [2200, 12, 0.06, 16],
  [1600, 18, 0.04, 13],
  [1100, 14, 0.03, 9],
  [2800, 10, 0.07, 20]
    ]
training_labels= [[3500],
                  [3000],
                  [3000],
                  [6000],
                  [3000],
                  [5000],
                  [3000],
                  [3000],
                  [2000],
                  [2000],
                  [3500],
                  [3000],
                  [3000],
                  [6000],
                  [3000],
                  [5000],
                  [3000],
                  [3000],
                  [2000],
                  [2000],
                  [3500],
                  [3000],
                  [3000],
                  [6000],
                  [3000],
                  [5000],
                  [3000],
                  [3000],
                  [2000],
                  [2000],
                  [5000],
                  [3000],
                  [3000],
                  [2000],
                  [2000],
                 ]
# Definir los datos de entrenamiento
X = [[prev_demand, prev_price, new_price, conversion_rate] for prev_demand, prev_price, new_price, conversion_rate in training_data]
y = [new_demand for new_demand in training_labels]

# Crear y entrenar el modelo
model = LinearRegression()
model.fit(X, y)

# Hacer una predicción para nuevos datos
new_data = [[prev_demand2, prev_price2, new_price2, conversion_rate2]]
predicted_demand = model.predict(new_data)



