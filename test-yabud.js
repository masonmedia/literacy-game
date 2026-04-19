const { chromium } = require('playwright');

async function testYaBudFires() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  let testsPassed = 0;
  let testsFailed = 0;

  try {
    // Navigate to math-grid
    await page.goto('http://localhost:3000/stem/math-grid', { waitUntil: 'networkidle' });
    console.log('✓ Navigated to math-grid');
    await page.waitForTimeout(500);

    // Test multiple game rounds
    for (let round = 1; round <= 4; round++) {
      console.log(`\n--- Round ${round} ---`);

      // Wait for grid to load
      await page.waitForSelector('input[data-cell]', { timeout: 5000 });
      console.log('✓ Grid loaded');

      // Get all input cells
      const inputs = await page.locator('input[data-cell]').all();
      console.log(`  Solving ${inputs.length} cells...`);

      // Solve each cell by finding the correct answer
      for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        const cellId = await input.getAttribute('data-cell');
        const cellIndex = parseInt(cellId.split('-')[1]);

        // Get the correct answer from Vue's internal state
        const correctAnswer = await page.evaluate((idx) => {
          // Access Vue's internal component state via the __vue__ property
          const inputEl = document.querySelector(`input[data-cell="cell-${idx}"]`);
          if (!inputEl) return null;

          // Find the closest grid-cell div
          const gridCell = inputEl.closest('.grid-cell');
          if (!gridCell) return null;

          // Get the equation text to help debug
          const eqText = gridCell.textContent;

          // Try to get from Vue component - this is a bit hacky but necessary
          // We'll look for the equation display text and solve it manually
          const equationDisplay = gridCell.querySelector('.equation-display');
          if (!equationDisplay) return null;

          // Get all text nodes and numbers
          const text = equationDisplay.innerText.replace(/\s+/g, '');

          // For now, we'll try systematically from 0-99
          return null; // We'll brute force below
        }, cellIndex);

        // Brute force: try answers 0-99 to find the correct one
        let solved = false;
        for (let answer = 0; answer <= 99 && !solved; answer++) {
          await input.fill(String(answer));
          await page.waitForTimeout(100);

          // Check if marked as correct
          const isCorrect = await input.evaluate((el) => {
            const cell = el.closest('.grid-cell');
            return cell?.classList.contains('correct') || false;
          });

          if (isCorrect) {
            console.log(`  ✓ Cell ${i+1}/${inputs.length}: Solved`);
            solved = true;
            break;
          }
        }

        if (!solved) {
          console.log(`  ⚠ Cell ${i+1}/${inputs.length}: Could not solve (might be pending)`);
        }
      }

      // Wait a bit for auto-checks to complete
      await page.waitForTimeout(800);

      // Verify all cells are marked correct
      const correctCells = await page.locator('.grid-cell.correct').count();
      console.log(`  ${correctCells} cells marked correct`);

      // Wait for YaBud to appear (with longer timeout to be safe)
      console.log('  Waiting for YaBud overlay...');

      let yaBudFired = false;
      try {
        await page.waitForSelector('.ya-bud-overlay', { timeout: 3000 });
        yaBudFired = true;
      } catch (e) {
        // Timeout waiting for YaBud
      }

      if (yaBudFired) {
        const yaBudPill = await page.locator('.ya-bud-pill').first();
        const isVisible = await yaBudPill.isVisible();

        if (isVisible) {
          const yaBudText = await yaBudPill.textContent();
          const thumbsUp = await page.locator('.thumbs-up-icon').first().textContent();
          console.log(`✓ YaBud FIRED! ${thumbsUp} ${yaBudText.trim()}`);
          testsPassed++;

          // Check for confetti
          const confettiCount = await page.locator('.particle').count();
          console.log(`  ✓ Confetti particles spawned: ${confettiCount}`);
        } else {
          console.log(`✗ FAILED: YaBud element found but not visible`);
          testsFailed++;
        }
      } else {
        console.log(`✗ FAILED: YaBud did not fire after round ${round}`);
        testsFailed++;

        // Debug info
        const gameWonState = await page.evaluate(() => {
          // Try to find reactive data
          return document.body.innerText.substring(0, 200);
        });
      }

      // Wait for game to reset (YaBud fades and new grid generates)
      console.log('  Waiting for new grid...');
      await page.waitForTimeout(3000);

      // Check if overlay is gone
      const overlayVisible = await page.locator('.ya-bud-overlay').isVisible({ timeout: 1000 }).catch(() => false);
      if (!overlayVisible) {
        console.log('✓ Reset complete, ready for next round');
      }
    }

  } catch (error) {
    console.error('\n❌ Test error:', error.message);
    testsFailed += 1;
  } finally {
    await browser.close();

    console.log('\n' + '='.repeat(60));
    console.log(`TEST RESULTS: ${testsPassed}/${testsPassed + testsFailed} rounds successful`);
    if (testsFailed === 0) {
      console.log('✓ YaBud fires reliably on EVERY round!');
    } else {
      console.log(`✗ YaBud FAILED to fire on ${testsFailed} round(s)`);
    }
    console.log('='.repeat(60));

    process.exit(testsFailed > 0 ? 1 : 0);
  }
}

testYaBudFires().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
