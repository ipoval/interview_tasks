#!/usr/bin/env ruby

# exp(sum(ln(number)))
Math.exp( [3, 4, 5].reduce(0) { |res, item| res += Math.log(item) } )
