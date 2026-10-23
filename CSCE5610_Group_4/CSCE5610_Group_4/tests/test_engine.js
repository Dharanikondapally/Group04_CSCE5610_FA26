const assert=require('node:assert/strict');const {parsePages,simulate,compare,belady}=require('../engine.js');
function check(r){assert.equal(r.hits+r.faults,r.total);for(const row of r.trace){assert.equal(row.frames.length,r.capacity);const pages=row.frames.filter(x=>x!==null);assert.equal(new Set(pages).size,pages.length);assert.equal(row.hits+row.faults,row.step);}}
const reference=[7,0,1,2,0,3,0,4,2,3,0,3,2];const base=compare(reference,3);assert.equal(base.fifo.faults,10);assert.equal(base.lru.faults,9);check(base.fifo);check(base.lru);
const anomaly=belady();assert.equal(anomaly.three.fifo.faults,9);assert.equal(anomaly.four.fifo.faults,10);assert.equal(anomaly.three.lru.faults,10);assert.equal(anomaly.four.lru.faults,8);
assert.deepEqual(parsePages('0, 2  3; 4'),[0,2,3,4]);assert.throws(()=>parsePages('1,-2'));assert.throws(()=>simulate([1,2],0,'FIFO'));for(let n=1;n<=6;n++){for(const policy of ['FIFO','LRU'])check(simulate(reference,n,policy));}
assert.equal(simulate([1,1,1],1,'FIFO').faults,1);assert.equal(simulate([1,1,1],1,'LRU').hits,2);
console.log('PASS: 16 assertions/cases plus invariants across 12 configurations. FIFO/LRU reference, Belady anomaly, parsing and edge cases verified.');
