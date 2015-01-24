# Generate n by n multiplication matrix

def view_matrix(matrix)
  header = '%-3d' * matrix.size
  matrix.each { |row| printf "#{header}\n", *row }
end

def multiplication_table(n)
  matrix = (1..n).map do |x|
    (1..n).reduce([]) { |a, e| a << x * e }
  end

  view_matrix matrix
end

multiplication_table(7)
