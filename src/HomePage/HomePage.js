function HomePage() {
    return (
      <main className="container center"> 
        <section class="page-area"> 

            <article class="text-box">
                <h2>Stay on Track</h2> 
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </article>

            <article class="text-box">
                <h2>Alerts</h2>
                <p>
                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </article>

            <article class="text-box">
                <h2>Results</h2>
                <p>
                    People who stick to a financial plan, budgeting every expense, get out of debt faster!
                    Also, they live happier lives... since they spend without guilt or fear...
                    because they know it is all good and accounted for.
                </p>
            </article>

            <article class="text-box" aria-labelledby="alerts-header"></article>
            <article class="text-box">
                <h2>Free</h2>
                <p>
                    <canvas id="myChart" width="400" height="400"></canvas>
                </p>
            </article>
            <article class="text-box">
                <h2>D3JS Chart</h2>
                <p>
                  <svg id="d3jsChart" width="500" height="400"></svg>
                </p>
        </article>

        </section>

    </main>
    );
  }
  
  export default HomePage;