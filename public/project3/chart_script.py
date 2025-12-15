
import plotly.graph_objects as go
import numpy as np

# Create figure
fig = go.Figure()

# Cart parameters
cart_width = 1.0
cart_height = 0.4
cart_x = 2.0  # Position of cart center
cart_y = 0.2  # Height of cart center above ground

# Pendulum parameters
pendulum_angle = 25  # degrees from vertical for illustration
pendulum_length = 1.5
theta_rad = np.deg2rad(pendulum_angle)

# Calculate pendulum end position
pendulum_base_x = cart_x
pendulum_base_y = cart_y + cart_height/2
pendulum_end_x = pendulum_base_x + pendulum_length * np.sin(theta_rad)
pendulum_end_y = pendulum_base_y + pendulum_length * np.cos(theta_rad)

# Draw ground/horizontal surface
fig.add_trace(go.Scatter(
    x=[-0.5, 5],
    y=[0, 0],
    mode='lines',
    line=dict(color='#13343B', width=3),
    showlegend=False,
    hoverinfo='skip'
))

# Add hatching below ground line to indicate surface
for i in np.linspace(-0.5, 5, 30):
    fig.add_trace(go.Scatter(
        x=[i, i-0.15],
        y=[0, -0.15],
        mode='lines',
        line=dict(color='#13343B', width=1),
        showlegend=False,
        hoverinfo='skip'
    ))

# Draw cart as rectangle
fig.add_shape(type="rect",
    x0=cart_x - cart_width/2, y0=cart_y - cart_height/2,
    x1=cart_x + cart_width/2, y1=cart_y + cart_height/2,
    line=dict(color="#1FB8CD", width=3),
    fillcolor="#B3E5EC"
)

# Draw wheels
wheel_radius = 0.1
for wheel_x in [cart_x - cart_width/3, cart_x + cart_width/3]:
    fig.add_shape(type="circle",
        x0=wheel_x - wheel_radius, y0=0 - wheel_radius,
        x1=wheel_x + wheel_radius, y1=0 + wheel_radius,
        line=dict(color="#13343B", width=2),
        fillcolor="white"
    )

# Draw pendulum rod
fig.add_trace(go.Scatter(
    x=[pendulum_base_x, pendulum_end_x],
    y=[pendulum_base_y, pendulum_end_y],
    mode='lines',
    line=dict(color='#DB4545', width=4),
    showlegend=False,
    hoverinfo='skip'
))

# Draw pendulum bob (mass m)
bob_radius = 0.15
fig.add_shape(type="circle",
    x0=pendulum_end_x - bob_radius, y0=pendulum_end_y - bob_radius,
    x1=pendulum_end_x + bob_radius, y1=pendulum_end_y + bob_radius,
    line=dict(color="#DB4545", width=2),
    fillcolor="#FFCDD2"
)

# Draw force F arrow
force_start_x = cart_x - cart_width/2 - 0.3
force_end_x = cart_x - cart_width/2 - 0.05
force_y = cart_y
fig.add_annotation(
    x=force_end_x, y=force_y,
    ax=force_start_x, ay=force_y,
    xref='x', yref='y',
    axref='x', ayref='y',
    showarrow=True,
    arrowhead=2,
    arrowsize=1.5,
    arrowwidth=3,
    arrowcolor='#2E8B57'
)
fig.add_annotation(
    x=force_start_x - 0.15, y=force_y,
    text="<b>F</b>",
    showarrow=False,
    font=dict(size=20, color='#2E8B57')
)

# Draw coordinate system (origin)
coord_x, coord_y = 0.5, 0
arrow_len = 0.4
# X-axis arrow
fig.add_annotation(
    x=coord_x + arrow_len, y=coord_y,
    ax=coord_x, ay=coord_y,
    xref='x', yref='y',
    axref='x', ayref='y',
    showarrow=True,
    arrowhead=2,
    arrowsize=1.2,
    arrowwidth=2,
    arrowcolor='black'
)
fig.add_annotation(
    x=coord_x + arrow_len + 0.1, y=coord_y,
    text="<b>x</b>",
    showarrow=False,
    font=dict(size=16, color='black')
)
# Y-axis arrow
fig.add_annotation(
    x=coord_x, y=coord_y + arrow_len,
    ax=coord_x, ay=coord_y,
    xref='x', yref='y',
    axref='x', ayref='y',
    showarrow=True,
    arrowhead=2,
    arrowsize=1.2,
    arrowwidth=2,
    arrowcolor='black'
)
fig.add_annotation(
    x=coord_x, y=coord_y + arrow_len + 0.15,
    text="<b>y</b>",
    showarrow=False,
    font=dict(size=16, color='black')
)

# Add cart position x annotation
fig.add_annotation(
    x=cart_x, y=-0.5,
    text="<b>x</b> (cart position)",
    showarrow=True,
    arrowhead=2,
    ax=cart_x, ay=-0.7,
    font=dict(size=14, color='#1FB8CD')
)
# Draw position line
fig.add_trace(go.Scatter(
    x=[cart_x, cart_x],
    y=[-0.05, -0.45],
    mode='lines',
    line=dict(color='#1FB8CD', width=1, dash='dash'),
    showlegend=False,
    hoverinfo='skip'
))

# Add cart mass M annotation
fig.add_annotation(
    x=cart_x, y=cart_y,
    text="<b>M</b>",
    showarrow=False,
    font=dict(size=18, color='#1FB8CD')
)

# Add pendulum mass m annotation
fig.add_annotation(
    x=pendulum_end_x + 0.25, y=pendulum_end_y,
    text="<b>m</b>",
    showarrow=False,
    font=dict(size=18, color='#DB4545')
)

# Add pendulum length l annotation
mid_x = (pendulum_base_x + pendulum_end_x) / 2
mid_y = (pendulum_base_y + pendulum_end_y) / 2
fig.add_annotation(
    x=mid_x + 0.2, y=mid_y,
    text="<b>l</b>",
    showarrow=False,
    font=dict(size=16, color='#DB4545')
)

# Add angle θ annotation with arc
fig.add_annotation(
    x=pendulum_base_x + 0.35, y=pendulum_base_y + 0.5,
    text="<b>θ</b>",
    showarrow=False,
    font=dict(size=18, color='black')
)

# Draw vertical reference line (dashed) for θ=0
fig.add_trace(go.Scatter(
    x=[pendulum_base_x, pendulum_base_x],
    y=[pendulum_base_y, pendulum_base_y + pendulum_length],
    mode='lines',
    line=dict(color='gray', width=1, dash='dash'),
    showlegend=False,
    hoverinfo='skip'
))

# Add θ=0 annotation
fig.add_annotation(
    x=pendulum_base_x - 0.25, y=pendulum_base_y + pendulum_length + 0.1,
    text="<b>θ=0</b><br>(upright)",
    showarrow=False,
    font=dict(size=12, color='gray')
)

# Draw arc for angle
arc_angles = np.linspace(90, 90 - pendulum_angle, 20)
arc_radius = 0.35
arc_x = pendulum_base_x + arc_radius * np.cos(np.deg2rad(arc_angles))
arc_y = pendulum_base_y + arc_radius * np.sin(np.deg2rad(arc_angles))
fig.add_trace(go.Scatter(
    x=arc_x, y=arc_y,
    mode='lines',
    line=dict(color='black', width=1.5),
    showlegend=False,
    hoverinfo='skip'
))

# Add velocity annotations
fig.add_annotation(
    x=cart_x + 0.6, y=cart_y + cart_height/2 + 0.15,
    text="<b>ẋ</b> (cart velocity)",
    showarrow=True,
    arrowhead=2,
    ax=cart_x + 0.8, ay=cart_y + cart_height/2 + 0.15,
    font=dict(size=12, color='#5D878F'),
    arrowcolor='#5D878F'
)

fig.add_annotation(
    x=pendulum_end_x - 0.3, y=pendulum_end_y + 0.3,
    text="<b>θ̇</b> (angular velocity)",
    showarrow=False,
    font=dict(size=12, color='#944454')
)

# Update layout
fig.update_layout(
    title={
        "text": "Inverted Pendulum System (Cart-Pole)<br><span style='font-size: 18px; font-weight: normal;'>Classic control system with labeled components and state variables</span>"
    },
    xaxis=dict(
        range=[-0.7, 5],
        showgrid=False,
        zeroline=False,
        showticklabels=False,
        title=""
    ),
    yaxis=dict(
        range=[-1, 2.5],
        showgrid=False,
        zeroline=False,
        showticklabels=False,
        title="",
        scaleanchor="x",
        scaleratio=1
    ),
    plot_bgcolor='white',
    showlegend=False
)

# Save the figure
fig.write_image("cart_pole_diagram.png")
fig.write_image("cart_pole_diagram.svg", format="svg")
