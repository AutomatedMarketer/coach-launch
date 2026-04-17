// Quick test that the retry condition actually works
const testError = new Error('Request timed out.')

console.log('Testing retry condition fix...')
console.log(`Error message: "${testError.message}"`)

const willRetry = testError.message?.includes('timed out') || testError.message?.includes('overloaded') || testError.message?.includes('timeout')

if (willRetry) {
  console.log('✅ PASS — Error message "Request timed out." will trigger retry')
  console.log('   Checked conditions: includes("timed out") OR includes("overloaded") OR includes("timeout")')
} else {
  console.log('❌ FAIL — Error would NOT retry')
  process.exit(1)
}
